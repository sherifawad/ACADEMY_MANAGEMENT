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
		t.field("refreshExpireIn", { type: "DateTime" });
		t.string("hash");
		t.string("userId");
		t.string("userId");
		t.field("user", {
			type: "User",
			resolve: async ({ userId }, _, { prisma }) => {
				return await prisma.refreshToken
					.findFirst({
						where: { userId },
					})
					.user();
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
				let refresh_Token = getTokenCookie(ctx.req);
				if (!refresh_Token || refresh_Token.length < 2) {
					if (token) {
						refresh_Token = token;
					}
				}
				const refreshToken: RefreshToken = await ctx.prisma.refreshToken.findFirst({
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
				const user: User = await ctx.prisma.user.findUnique({
					where: {
						id: userId,
					},
				});
				if (!user) throw new Error("RefreshAccessTokenError");
				const { accessToken } = await createTokens(user, refreshToken, ctx);

				return { ...accessToken };
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
				let refresh_Token = getTokenCookie(req);
				if (!refresh_Token || refresh_Token.length < 2) {
					if (token) {
						refresh_Token = token;
					}
				}
				const refreshToken: RefreshToken = await prisma.refreshToken.findFirst({
					where: {
						userId,
						valid: true,
						hash: refresh_Token,
					},
				});
				if (!refreshToken) return null;
				return await prisma.refreshToken.update({
					where: {
						id: refreshToken.id,
					},
					data: { valid: false },
				});
			},
		});
	},
});
