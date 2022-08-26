import prisma from "../../lib/prisma";
import { providerTypes } from "../core/constants";
import { hashPassword, verifyPassword } from "../core/crypto";
import { User } from "../typings/interface";
import { createTokens } from "../utils/auth";

/**
 * Handle using credentials Providers Register.
 * hash the password
 * create user
 * @param user_password
 * @param user_data
 * @returns user
 */
export const handleCredentialProviderRegister = async (
	user_password: string,
	user_data: Omit<User, "id">
) => {
	try {
		const { email, name, image, role } = user_data;

		const password = await hashPassword(user_password);
		return await prisma.user.create({
			data: {
				email,
				image,
				name,
				role,
				password: {
					create: {
						password,
						forceChange: false
					}
				}
			},
			include: {
				password: true
			}
		});
	} catch (error) {
		throw error;
	}
};

/**
 * handle credentials login
 * check for existing user by email
 * compare hashed password
 * @param user_password
 * @param user_data
 * @returns user data
 */
export const handleCredentialProviderLogin = async (
	user_password: string,
	email: string
) => {
	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: { email },
			include: { password: true }
		});
		const { password, ...rest } = user;
		if (password) {
			const isVerified = await verifyPassword(
				user_password,
				password.password
			);
			if (isVerified) {
				const account = await prisma.account.findUniqueOrThrow({
					where: {
						provider_providerAccountId: {
							provider: providerTypes.CREDENTIALS,
							providerAccountId: user.id
						}
					}
				});
				const tokens = createTokens(
					rest,
					account.refresh_token as string
				);
				return {
					user,
					...tokens
				};
			}
			throw new Error("Not Allowed");
		}
		throw new Error("Not Allowed");
	} catch (error) {
		throw error;
	}
};
