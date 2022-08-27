import srs from "secure-random-string";
import prisma from "../../lib/prisma";
import { createTokens, randomRefreshHashGenerations } from "../utils/auth";

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
		const { refresh_token, expires_at } = randomRefreshHashGenerations();

		const user = await prisma.account
			.update({
				where: {
					provider_providerAccountId: {
						provider,
						providerAccountId
					}
				},
				data: {
					refresh_token,
					expires_at,
					user: {
						update: {
							name: name || undefined,
							image: image || undefined,
							email: email || undefined
						}
					}
				},
				include: { user: true }
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

/**
 *
 * @param email user mail
 * @param provider provider name
 * @param providerAccountId user id on provider
 * @param type auth type
 * @param token_type type of used token
 * @param name user name
 * @param image user Image
 * @param userId user id
 * @param scope provider scope
 * @returns user and tokens{access, refresh}
 */
export const handleUserAccountRegister = async (
	email: string,
	provider: string,
	providerAccountId: string,
	type: string,
	name: string,
	image: string,
	userId: string,
	token_type?: string,
	scope?: string
) => {
	try {
		const { refresh_token, expires_at } = randomRefreshHashGenerations();

		const user = await prisma.account
			.create({
				data: {
					provider,
					providerAccountId,
					type,
					scope,
					token_type,
					refresh_token,
                    expires_at,
					user: {
						connectOrCreate: {
							where: { id: userId },
							create: {
								id: userId,
								name,
								image,
								email
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
