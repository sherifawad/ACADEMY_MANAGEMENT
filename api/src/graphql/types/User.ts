import {
	Contact,
	Group,
	PrismaClient,
	Profile,
	RefreshToken,
	Role,
	User as prismaUser,
} from "@prisma/client";
import { hashPassword, verifyPassword } from "../../core/crypto";
import {
	nonNull,
	objectType,
	stringArg,
	extendType,
	inputObjectType,
	intArg,
	nullable,
	booleanArg,
	arg,
} from "nexus";
import { Context } from ".";
import { GetUserPassword } from "./UserPassword";
import { Role as userRole } from "@prisma/client";
import srs from "secure-random-string";
import { assert } from "../utils/assert";
import { encodeUser } from "../../core/jwt";
import LoginInvalidError from "../utils/errors/loginInvalid";
import { setTokenCookie } from "../../core/auth-cookies";
import { createTokens } from "../../utils/auth";

// export interface User {
// 	id: string;
// 	name?: string | null;
// 	avatar?: string | null;
// 	isActive?: boolean | null;
// 	role?: Role | null;
// 	profile?: Profile | null;
// 	contact?: Contact | null;
// }
export interface CursorPaginationInput {
	take?: number | null;
	skip?: number | null; // Skip the cursor
	myCursor?: string | null;
	orderByKey?: string | null;
	orderDirection?: string | null;
	sort?: any[] | null;
}
export interface CursorPagination {
	take?: number;
	skip?: number; // Skip the cursor
	cursor?: {
		id: string;
	};
	orderBy?: { [x: string]: string };
}

export interface UserFilter {
	role?: Role | null;
	isActive?: boolean | null;
	groupId?: string | null;
}
export interface UserFilterPagination extends CursorPagination {
	where?: UserFilter;
}
export interface UserFilterPaginationInput extends UserFilter {
	PaginationInputType?: CursorPaginationInput | null;
}

//generates User type at schema.graphql
export const User = objectType({
	name: "User",
	definition(t) {
		t.string("id");
		t.string("name");
		t.boolean("isActive");
		t.string("avatar");
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
		t.nullable.field("contact", {
			type: "Contact",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.user
					.findUnique({
						where: { id },
					})
					.contact();
			},
		});
	},
});

export const PaginationInputType = inputObjectType({
	name: "PaginationInputType",

	definition(t) {
		t.nullable.string("myCursor");
		t.nullable.string("orderByKey");
		t.nullable.string("orderDirection");
		t.nonNull.int("take");
		t.nullable.int("skip");
		t.list.nullable.field("sort", { type: "JSONObject" });
	},
});

export const UserFilterInputType = inputObjectType({
	name: "UsersFilterInputType",
	definition(t) {
		// t.nullable.field("PaginationInputType", {
		// 	type: "PaginationInputType",
		// });
		t.nullable.field("role", { type: "Role" });
		t.nullable.boolean("isActive");
		t.nullable.string("StudentId");
	},
});

export const UsersCount = objectType({
	name: "UsersCount",
	definition(t) {
		t.int("_count");
	},
});

export const UsersResponse = objectType({
	name: "UsersResponse",
	definition(t) {
		t.list.field("list", {
			type: User,
		});
		t.string("prevCursor");
		t.nullable.string("nextCursor");
		t.nullable.field("totalCount", { type: UsersCount });
	},
});
export const StudentsResponse = objectType({
	name: "StudentsResponse",
	definition(t) {
		t.field("students", {
			type: UsersResponse,
		});
		t.nullable.string("groupName");
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

export function getKeys(obj: any) {
	let keyName;
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (typeof value === "object") {
			return { ...acc, [key]: value };
		}
		return acc;
	}, {});
}

export const queryArgs = (args: CursorPaginationInput, filter = {}): UserFilterPagination => {
	const { take, skip, myCursor, orderByKey, orderDirection, sort } = args || {};

	let data = {};
	if (myCursor) {
		data = {
			...data,
			skip: 1, // Skip the cursor
			cursor: {
				id: myCursor,
			},
		};
	}

	if (skip) {
		data = {
			...data,
			skip,
		};
	}

	if (sort) {
		data = {
			...data,
			orderBy: sort,
		};
	}

	if (orderByKey && orderDirection) {
		if (orderByKey.toLocaleLowerCase() === "exams" || orderByKey.toLocaleLowerCase() === "score") {
			data = {
				...data,
				orderBy: [
					{
						profile: {
							exams: {
								_count: orderDirection,
							},
						},
					},
				],
			};
		} else if (
			orderByKey.toLocaleLowerCase() === "attendances" ||
			orderByKey.toLocaleLowerCase() === "startat" ||
			orderByKey.toLocaleLowerCase() === "endat"
		) {
			data = {
				...data,
				orderBy: {
					profile: {
						attendances: {
							_count: orderDirection,
						},
					},
				},
			};
		} else {
			data = { ...data, orderBy: { [orderByKey]: orderDirection } };
		}
	}

	if (take) {
		data = { ...data, take: Number(take) };
	}

	if (filter) {
		data = { ...data, where: filter };
	}
	return data;
};

export const FilteredUsersQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("FilteredUsers", {
			type: "UsersResponse",
			args: {
				data: PaginationInputType,
				isActive: nullable(booleanArg()),
				role: nullable(arg({ type: "Role" })),
			},
			resolve: async (_parent, args, { prisma, user }) => {
				try {
					if (!user || user.role !== Role.ADMIN) return null;
					// return await prisma.user.findMany({
					// 	where: {
					// 		role: args.data?.role,
					// 		isActive: args.data?.isActive,
					// 	},
					// });
					const { data, isActive, role } = args;
					let where = {};
					if (role) {
						where = { ...where, role };
					}
					if (isActive) {
						where = { ...where, isActive };
					}
					let result: prismaUser[];
					let totalCount: { _count: number } | undefined | null;
					let prevCursor: string | undefined | null;
					let nextCursor: string | undefined | null;
					let groupName: { name: string } | undefined | null;

					if (data) {
						result = await prisma.user.findMany(queryArgs(data, where));

						nextCursor = result[result?.length - 1]?.id;
						prevCursor = result[0]?.id;

						if (!data?.myCursor) {
							totalCount = await prisma.user.aggregate({
								where,
								_count: true,
							});
						}
					} else {
						result = await prisma.user.findMany({
							where,
						});
					}

					return {
						list: result,
						prevCursor,
						nextCursor,
						totalCount,
						groupName: groupName?.name,
					};
				} catch (error) {
					return Promise.reject(error);
				}
			},
		});
	},
});

export const GroupStudentsQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("studentsGroup", {
			type: "StudentsResponse",
			args: {
				data: PaginationInputType,
				isActive: nullable(booleanArg()),
				groupId: nonNull(stringArg()),
				role: nullable(arg({ type: "Role" })),
			},
			resolve: async (_parent, args, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const { data, isActive, groupId, role } = args;
				let where = {};
				if (role) {
					where = { ...where, role };
				}
				if (isActive) {
					where = { ...where, isActive };
				}
				if (groupId) {
					where = {
						...where,
						profile: {
							group: {
								id: groupId,
							},
						},
					};
				}
				let result: prismaUser[];
				let totalCount: { _count: number } | undefined | null;
				let prevCursor: string | undefined | null;
				let nextCursor: string | undefined | null;
				let groupName: { name: string } | undefined | null;

				if (data) {
					result = await prisma.user.findMany(queryArgs(data, where));

					nextCursor = result[result?.length - 1]?.id;
					prevCursor = result[0]?.id;

					if (!data?.myCursor) {
						totalCount = await prisma.user.aggregate({
							where: {
								profile: {
									group: {
										id: groupId,
									},
								},
							},
							_count: true,
						});
						groupName = await prisma.Group.findUnique({
							where: { id: groupId },
							select: {
								name: true,
							},
						});
					}
				} else {
					result = await prisma.user.findMany({
						where,
					});
				}

				return {
					students: {
						list: result,
						prevCursor,
						nextCursor,
						totalCount,
					},
					groupName: groupName?.name,
				};
			},
		});
	},
});

export type UserParam = Pick<prismaUser, "avatar" | "name"> &
	Pick<Contact, "email" | "parentsPhones" | "address" | "phone">;

export type StudentParam = Pick<prismaUser, "name"> &
	Pick<Contact, "email" | "parentsPhones" | "address" | "phone"> &
	Pick<Group, "id">;

export async function GetUserByEmail(prisma: PrismaClient, email: string): Promise<Contact | null> {
	return await prisma.contact.findUnique({
		where: {
			email,
		},
	});
}

export async function ValidateUserCredentials(
	prisma: PrismaClient,
	user: prismaUser | Contact,
	password: string
): Promise<boolean> {
	const userPassword = await GetUserPassword(prisma, user);

	if (userPassword == null) {
		return false;
	}

	return await verifyPassword(password, userPassword.password);
}

export async function CreateStudent(ctx: Context, studentParam: StudentParam, password: string) {
	const hashedPassword = await hashPassword(password);
	const { name, id, ...rest } = studentParam;
	return await ctx.prisma.user.create({
		data: {
			name,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
			contact: {
				create: {
					...rest,
				},
			},
			profile: {
				create: {
					createdBy: ctx.user?.id || "",
					group: {
						connect: {
							id,
						},
					},
				},
			},
		},
		include: {
			password: true,
			contact: true,
			profile: true,
		},
	});
}

export async function CreateUser(ctx: Context, userParam: UserParam, password: string): Promise<prismaUser> {
	const hashedPassword = await hashPassword(password);
	const { name, avatar, ...rest } = userParam;
	return await ctx.prisma.user.create({
		data: {
			name,
			avatar,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
			contact: {
				create: {
					...rest,
				},
			},
		},
		include: {
			password: true,
			contact: true,
		},
	});
}

export async function CreateRefreshTokenForUser(
	prisma: PrismaClient,
	user: prismaUser | Contact
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

export function CreateJWTForUser(user: prismaUser): string {
	const { JWT_SECRET } = process.env;

	assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
	return encodeUser(user, JWT_SECRET);
}

//get unique User
export const UserByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("User", {
			type: "User",
			args: { id: nonNull(stringArg()), take: nullable(intArg()) },
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
export const studentRegister = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("studentRegister", {
			type: "User",
			args: {
				name: stringArg(),
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
				address: nonNull(stringArg()),
				parentsPhones: stringArg(),
				phone: nonNull(stringArg()),
				groupId: nonNull(stringArg()),
			},
			resolve: async (
				_parent,
				{ name, email, password, address, parentsPhones, phone, groupId },
				ctx
			) => {
				const studentParam: StudentParam = {
					email,
					address,
					phone,
					parentsPhones: parentsPhones ?? phone,
					name: name ?? email,
					id: groupId,
				};

				return await CreateStudent(ctx, studentParam, password);
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
				address: nonNull(stringArg()),
				parentsPhones: stringArg(),
				avatar: stringArg(),
				phone: nonNull(stringArg()),
			},
			resolve: async (
				_parent,
				{ name, email, password, avatar, address, parentsPhones, phone },
				ctx
			) => {
				const userParam: UserParam = {
					avatar: avatar ?? null,
					email,
					address,
					phone,
					parentsPhones: parentsPhones ?? phone,
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
			resolve: async (_, { email, password }, ctx) => {
				const user = await GetUserByEmail(ctx.prisma, email);

				if (user == null || !(await ValidateUserCredentials(ctx.prisma, user, password))) {
					throw new LoginInvalidError("Invalid username or password");
				}

				const refreshToken: Pick<RefreshToken, "expiration" | "hash" | "userId"> =
					await CreateRefreshTokenForUser(ctx.prisma, user);
				const { accessToken } = await createTokens({ userId: user.id }, refreshToken, ctx);

				// const token = CreateJWTForUser(user.user);
				// setTokenCookie(ctx.res, refreshToken.hash);

				return {
					token: accessToken,
				};
			},
		});
	},
});
