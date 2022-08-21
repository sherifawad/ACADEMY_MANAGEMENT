import { RefreshToken, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { getTokenCookie } from "../../core/auth-cookies";
import { encodeUser } from "../../core/jwt";
import { createTokens } from "../../utils/auth";

export const RefreshTokenObject = objectType({
	name: "RefreshTokenObject",
	description: "Refresh token",
	definition(t) {
		t.field("refreshExpireIn", { type: "DateTime" });
		t.string("hash");
		t.string("userId");
	},
});

export const AuthPayload = objectType({
	name: "AuthPayload",
	description: "Payload containing auth token",
	definition(t) {
		t.int("accessTokenExpiresIn");
		t.string("accessToken");
		t.field("refreshTokenExpiresIn", { type: "DateTime" });
		t.string("refreshToken");
		t.string("userId");
		t.field("user", {
			type: "User",
			resolve: async ({ userId }, _, { prisma }) => {
				try {
					return await prisma.refreshToken
						.findFirst({
							where: { userId },
						})
						.user();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const GetAccessToken = extendType({
	type: "Mutation",
	definition(t) {
		t.field("refreshToken", {
			type: "AuthPayload",
			args: {
				userId: nonNull(stringArg()),
				token: nonNull(stringArg()),
			},
			resolve: async (_parent, { userId, token }, ctx) => {
				try {
					let refresh_Token = getTokenCookie(ctx.req);
					if (!refresh_Token || refresh_Token.length < 2) {
						if (token) {
							refresh_Token = token;
						}
					}
					const refreshToken: RefreshToken = await ctx.prisma.refreshToken.findFirstOrThrow({
						where: {
							userId,
							valid: true,
							hash: refresh_Token,
						},
					});
					if (
						!refreshToken ||
						!refreshToken.valid ||
						Date.now().valueOf() > refreshToken.expiration.valueOf()
					)
						throw new Error("RefreshAccessTokenError");
					const user: User = await ctx.prisma.user.findUniqueOrThrow({
						where: {
							id: userId,
						},
					});
					if (!user) throw new Error("RefreshAccessTokenError");
					const { accessToken } = await createTokens(user, refreshToken, ctx);

					return accessToken;
				} catch (error) {
					console.log("🚀 ~ file: authPayload.ts ~ line 84 ~ resolve: ~ error", error);
					return Promise.reject(new Error("RefreshAccessTokenError"));
				}
			},
		});
	},
});

export const RevokeRefreshToken = extendType({
	type: "Mutation",
	definition(t) {
		t.field("revokeToken", {
			type: "AuthPayload",
			args: {
				userId: nonNull(stringArg()),
				token: nonNull(stringArg()),
			},
			resolve: async (_parent, { userId, token }, { req, prisma }) => {
				try {
					let refresh_Token = getTokenCookie(req);
					if (!refresh_Token || refresh_Token.length < 2) {
						if (token) {
							refresh_Token = token;
						}
					}
					const refreshToken: RefreshToken = await prisma.refreshToken.findFirstOrThrow({
						where: {
							userId,
							valid: true,
							hash: refresh_Token,
						},
					});
					if (!refreshToken) throw new Error("RefreshAccessTokenError");
					return await prisma.refreshToken.update({
						where: {
							id: refreshToken.id,
						},
						data: { valid: false },
					});
				} catch (error) {
					console.log("🚀 ~ file: authPayload.ts ~ line 123 ~ resolve: ~ error", error);
					return Promise.reject(new Error("RefreshAccessTokenError"));
				}
			},
		});
	},
});
