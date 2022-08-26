import srs from "secure-random-string";
import prisma from "../../lib/prisma";
import { createTokens } from "../utils/auth";

/**
 *
 * @param providerAccountId user id in the provider
 * @param provider provider user name
 * @param email provider user email
 * @param name provider user name
 * @param image provider user image
 * @returns user and tokens{access, refresh}
 */
export const handleUserAccountLogin = async (
	providerAccountId: string,
	provider: string,
	email: string,
	name: string,
	image: string
) => {
	try {
		const account = await prisma.account.findUniqueOrThrow({
			where: {
				provider_providerAccountId: {
					provider,
					providerAccountId
				}
			},
			include: { user: true }
		});
		if (account) {
			const { user } = account;
			const updatedUser = await prisma.user.update({
				where: { id: user.id },
				data: {
					name: name || undefined,
					image: image || undefined,
					email: email || undefined
				}
			});
			const tokens = createTokens(
				updatedUser,
				account.refresh_token as string
			);
			return {
				user,
				...tokens
			};
		}
		throw new Error("Not Allowed");
	} catch (error) {
		throw error;
	}
};

/**
 *
 * @param email user mail
 * @param provider provider name
 * @param providerAccountId user id on provider
 * @param type auth type
 * @param token_type type of used token
 * @param name user name
 * @param image user Image
 * @param role user role
 * @param userId user id
 * @param scope provider scope
 * @returns user and tokens{access, refresh}
 */
export const handleUserAccountRegister = async (
	email: string,
	provider: string,
	providerAccountId: string,
	type: string,
	token_type: string,
	name: string,
	image: string,
	userId: string,
	scope?: string
) => {
	try {
		let refresh_token = srs({ length: 100 });
		const user = await prisma.account
			.upsert({
				where: {
					provider_providerAccountId: {
						provider,
						providerAccountId
					}
				},
				create: {
					provider,
					providerAccountId,
					type,
					scope,
					token_type,
					refresh_token,
					user: {
						connectOrCreate: {
							where: { id: userId },
							create: {
								name,
								image,
								email
							}
						}
					}
				},
				update: {}
			})
			.user();
		if (user) {
			const tokens = createTokens(user, refresh_token);
			return {
				user,
				...tokens
			};
		}
		throw new Error("Not Allowed");
	} catch (error) {
		throw error;
	}
};
