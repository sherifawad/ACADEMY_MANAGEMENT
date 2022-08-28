import srs from "secure-random-string";
import prisma from "../../lib/prisma";
import { AccountLoginsInputs, AccountRegisterInputs } from "../typings/types";
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
export const handleUserAccountLogin = async ({
	providerAccountId,
	provider,
	email,
	name,
	image
}: AccountLoginsInputs) => {
	try {
		const { refresh_token, expires_at } = randomRefreshHashGenerations();

		const account = await prisma.account.update({
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
		});
		const user = account.user;
		if (user) {
			const tokens = await createTokens(user, refresh_token);
			return {
				user,
				provider: account.provider,
				providerAccountId: account.providerAccountId,
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
export const handleUserAccountRegister = async ({
	email,
	provider,
	providerAccountId,
	name,
	image,
	userId,
	type,
	token_type,
	scope
}: AccountRegisterInputs) => {
	try {
		const { refresh_token, expires_at } = randomRefreshHashGenerations();

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
				},
				update: {
					user: {
						update: {
							name,
							image,
							email
						}
					}
				}
			})
			.user();

		if (user) {
			const tokens = await createTokens(user, refresh_token);

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
