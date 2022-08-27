import srs from "secure-random-string";
import prisma from "../../lib/prisma";
import constants, { providerTypes } from "../core/constants";
import { hashPassword, verifyPassword } from "../core/crypto";
import { User } from "../typings/interface";
import { createTokens, randomRefreshHashGenerations } from "../utils/auth";

/**
 *
 * @param user_password
 * @param user_data
 * @param provider
 * @param providerAccountId
 * @returns user and tokens{access, refresh}
 */
export const handleCredentialProviderRegister = async (
	user_password: string,
	provider: string,
	providerAccountId: string,
	type: string,
	user_data: User
) => {
	try {
		const { email, name, image, id } = user_data;

		const password = await hashPassword(user_password);
		const { refresh_token, expires_at } = randomRefreshHashGenerations();

		const user = await prisma.account
			.create({
				data: {
					provider,
					providerAccountId,
					type,
					refresh_token,
					expires_at,
					user: {
						create: {
							password: {
								create: {
									password: password,
									forceChange: false
								}
							}
						},
						connectOrCreate: {
							where: {
								id
							},
							create: {
								id,
								email,
								name,
								image
							}
						}
					}
				}
			})
			.user();
		if (user) {
			const tokens = createTokens(user, refresh_token);
			return {
				user,
				...tokens
			};
		}
		throw new Error(`${provider} provider  register error`);
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
	email: string,
	provider: string,
	providerAccountId: string
) => {
	try {
		const { refresh_token, expires_at } = randomRefreshHashGenerations();

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
				const account = await prisma.account.update({
					where: {
						provider_providerAccountId: {
							provider,
							providerAccountId
						}
					},
					data: {
						refresh_token,
						expires_at
					}
				});
				if (account) {
					const tokens = await createTokens(
						{ ...rest },
						refresh_token
					);

					return {
						user: { ...rest },
						...tokens
					};
				}
				throw new Error("Not Allowed");
			}
			throw new Error("Not Allowed");
		}
		throw new Error("Not Allowed");
	} catch (error) {
		console.log(
			"🚀 ~ file: creditialsProviderService.ts ~ line 127 ~ error",
			error
		);
		throw error;
	}
};
