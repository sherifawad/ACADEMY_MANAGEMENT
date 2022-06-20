import { RefreshToken, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { getTokenCookie } from "../../core/auth-cookies";
import { encodeUser } from "../../core/jwt";

export const AuthPayload = objectType({
	name: "AuthPayload",
	description: "Payload containing auth token",
	definition(t) {
		t.string("token");
		t.string("refreshToken");
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
				if (
					!refreshToken ||
					!refreshToken.valid ||
					Date.now().valueOf() > refreshToken.expiration.valueOf()
				)
					return null;
				const user: User = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				});
				if (!user) return null;
				return { token: encodeUser(user) };
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
