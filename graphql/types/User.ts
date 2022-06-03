import { PrismaClient, RefreshToken, Role, User as prismaUser } from "@prisma/client";
import { hashPassword, verifyPassword } from "core/crypto";
import { sign } from "jsonwebtoken";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, enumType } from "nexus";
import { Context, UserToken } from ".";
import { GetUserPassword } from "./UserPassword";
import srs from "secure-random-string";
import { assert } from "graphql/utils/assert";
import LoginInvalidError from "graphql/utils/errors/loginInvalid";
import { serialize } from "cookie";
import { Role as userRole } from "@prisma/client";
import { setTokenCookie } from "../../core/auth-cookies";
import { NextApiResponse } from "next";
import { encodeUser } from "core/jwt";

//generates User type at schema.graphql
export const User = objectType({
	name: "User",
	definition(t) {
		t.string("id");
		t.string("name");
		t.string("avatar");
		t.string("email");
		t.boolean("emailConfirmed");
		t.field("role", { type: "Role" });
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.nullable.field("profile", {
			type: "Profile",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.user
					.findUnique({
						where: { id },
					})
					.profile();
			},
		});
	},
});

//get all Users
export const UsersQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("Users", {
			type: "User",
			resolve: async (_parent, _args, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;
				return await prisma.user.findMany();
			},
		});
	},
});

export type UserParam = Pick<prismaUser, "avatar" | "email" | "name">;

export async function GetUserByEmail(prisma: PrismaClient, email: string): Promise<prismaUser | null> {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function ValidateUserCredentials(
	prisma: PrismaClient,
	user: prismaUser,
	password: string
): Promise<boolean> {
	const userPassword = await GetUserPassword(prisma, user);

	if (userPassword == null) {
		return false;
	}

	return await verifyPassword(password, userPassword.password);
}

export async function CreateUser(ctx: Context, userParam: UserParam, password: string): Promise<prismaUser> {
	const hashedPassword = await hashPassword(password);

	return await ctx.prisma.user.create({
		data: {
			...userParam,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
		},
		include: {
			password: true,
		},
	});
}

export async function CreateRefreshTokenForUser(
	prisma: PrismaClient,
	user: prismaUser
): Promise<RefreshToken> {
	let hash = srs({ length: 100 });
	var expiration = new Date();

	expiration.setDate(expiration.getDate() + 14);
	return await prisma.refreshToken.create({
		data: {
			expiration,
			hash,
			label: "Login",
			userId: user.id,
		},
	});
}

export function CreateJWTForUser(user): string {
	const { JWT_SECRET } = process.env;

	assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
	return encodeUser(user, JWT_SECRET);
	// const token: UserToken = {
	// 	userId: user.id,
	// };

	// return sign(token, JWT_SECRET, {
	// 	expiresIn: "10m",
	// });
}

//get unique User
export const UserByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("User", {
			type: "User",
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { user, prisma }) => {
				if (!user || user.role !== userRole.ADMIN) return null;
				return await prisma.user.findUnique({
					where: { id },
				});
			},
		});
	},
});

// update User
export const UpdateUserMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateUser", {
			type: "User",
			args: {
				id: nonNull(stringArg()),
				name: stringArg(),
				email: stringArg(),
				avatar: stringArg(),
				password: stringArg(),
			},
			resolve: async (_parent, { id, name, avatar, email, password }, { prisma, user }) => {
				//check if the login user who make the change
				//check if the user with admin role who make the change
				if (!user || user.id !== id || user.role !== userRole.ADMIN) return null;

				const updateUser = {
					name,
					avatar,
					email,
				};
				return await prisma.user.update({
					where: { id },
					data: { ...updateUser },
				});
			},
		});
	},
});

// When a user signs up proper (email + password)
export const userRegister = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("userRegister", {
			type: "User",
			args: {
				name: stringArg(),
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
				avatar: stringArg(),
			},
			resolve: async (_parent, { name, email, password, avatar }, ctx) => {
				const userParam: UserParam = {
					avatar: avatar ?? null,
					email,
					name: name ?? email,
				};

				return await CreateUser(ctx, userParam, password);
			},
		});
	},
});

export const userLogin = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("userLogin", {
			type: "AuthPayload",
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
			},
			resolve: async (_, { email, password }, { res, prisma }) => {
				const user = await GetUserByEmail(prisma, email);

				if (user == null || !(await ValidateUserCredentials(prisma, user, password))) {
					throw new LoginInvalidError("Invalid username or password");
				}

				const refreshToken = await CreateRefreshTokenForUser(prisma, user);
				const token = CreateJWTForUser(user);
				setTokenCookie(res, token);

				return {
					token,
					user,
				};
			},
		});
	},
});
