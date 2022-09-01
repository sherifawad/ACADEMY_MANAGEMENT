import { Contact, Group, PrismaClient, User as prismaUser } from "@internal/prisma/client";
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
	list,
} from "nexus";
import { Context } from ".";
import { UserRole } from "./UserRole";
import { assert } from "../utils/assert";
import { encodeUser } from "../../core/jwt";
import LoginInvalidError from "../utils/errors/loginInvalid";
import { setTokenCookie } from "../../core/auth-cookies";
import { createTokens } from "../../utils/auth";
import { isNullish, removeNullObjects } from "../../utils/utils";
import constants from "../../core/constants";

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
	role?: any | null;
	isActive?: boolean | null;
	groupId?: string | null;
	familyId?: string | null;
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
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.field("role", {
			type: UserRole,
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.user
					.findUniqueOrThrow({
						where: { id },
					})
					.role();
			},
		});
		t.nullable.field("profile", {
			type: "Profile",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.user
					.findUniqueOrThrow({
						where: { id },
					})
					.profile();
			},
		});
		t.nullable.field("contact", {
			type: "Contact",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.user
					.findUniqueOrThrow({
						where: { id },
					})
					.contact();
			},
		});
		t.nullable.field("family", {
			type: "Family",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.user
					.findUniqueOrThrow({
						where: { id },
					})
					.family();
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
		t.nullable.list.int("rolesIdsList");
		t.nullable.boolean("isActive");
		t.nullable.string("StudentId");
		t.nullable.string("familyId");
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
				try {
					return await prisma.user.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
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
				// user_role: nullable(list(UserRole)),
				family_Id: nullable(stringArg()),
			},
			resolve: async (_parent, args, { prisma, user }) => {
				try {
					const { data, isActive, family_Id } = args;
					const { familyId, role } = user || {};

					let where = {};
					// if (user_role) {
					// 	const ORConditions: { role: string }[] = [];
					// 	user_role.forEach((x: any) => {
					// 		if (x) {
					// 			switch (user.role) {
					// 				case "ADMIN":
					// 					ORConditions.push({ role: x });
					// 					break;
					// 				case "USER":
					// 					if (x === "ADMIN") return;
					// 					ORConditions.push({ role: x });
					// 					break;

					// 				default:
					// 					break;
					// 			}
					// 		}
					// 	});
					// 	if (ORConditions && ORConditions.length > 0) where = { ...where, OR: ORConditions };
					// }
					if (family_Id) {
						where = { ...where, familyId: family_Id };
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
					return Promise.reject("error");
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
				// role: nullable(UserRole),
			},
			resolve: async (_parent, args, { prisma, user }) => {
				const { data, isActive, groupId } = args;
				let where = {};
				// if (role) {
				// 	where = { ...where, role };
				// }
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
						groupName = await prisma.Group.findUniqueOrThrow({
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
	Pick<Contact, "email" | "parentsPhones" | "address" | "phone"> &
	Partial<Pick<Group, "id">>;

export type StudentParam = Pick<prismaUser, "name"> &
	Pick<Contact, "email" | "parentsPhones" | "address" | "phone"> &
	Partial<Pick<Group, "id">>;

export async function GetUserByEmail(prisma: PrismaClient, email: string): Promise<Contact | null> {
	return await prisma.contact.findUniqueOrThrow({
		where: {
			email,
		},
	});
}

// export async function CreateStudent(ctx: Context, studentParam: StudentParam, password: string) {
// 	const hashedPassword = await hashPassword(password);
// 	const { name, id, ...rest } = studentParam;
// 	return await ctx.prisma.user.create({
// 		data: {
// 			name,
// 			password: {
// 				create: {
// 					password: hashedPassword,
// 					forceChange: false,
// 				},
// 			},
// 			contact: {
// 				create: {
// 					...rest,
// 				},
// 			},
// 			profile: {
// 				create: {
// 					createdBy: ctx.user?.id || "",
// 					group: {
// 						connect: {
// 							id,
// 						},
// 					},
// 				},
// 			},
// 		},
// 		include: {
// 			password: true,
// 			contact: true,
// 			profile: true,
// 		},
// 	});
// }
export async function UpdateUser(ctx: Context, studentParam: any, userPassword?: string | null | undefined) {
	try {
		const hashedPassword = userPassword ? await hashPassword(userPassword) : undefined;
		const { name, id, groupId, roleId, avatar, familyName, familyId, ...rest } = studentParam;
		const password = hashedPassword
			? {
					update: {
						password: hashedPassword,
						forceChange: false,
					},
			  }
			: undefined;

		const role = roleId
			? {
					connect: {
						id: roleId,
					},
			  }
			: undefined;
		const family = familyName
			? {
					upsert: {
						create: {
							createdBy: ctx.user?.id || "",
							familyName: familyName,
						},
						update: {
							updatedBy: ctx.user?.id || "",
							familyName: familyName,
						},
					},
			  }
			: undefined;
		const profile = groupId
			? {
					update: {
						updatedBy: ctx.user?.id || "",
						group: {
							connect: {
								id: groupId,
							},
						},
					},
			  }
			: undefined;
		const allIsNull = isNullish(rest);
		const contact = !allIsNull
			? {
					update: {
						...removeNullObjects(rest),
					},
			  }
			: undefined;
		const data = {
			name: name ? name : undefined,
			avatar: avatar ? avatar : undefined,
			role,
			password,
			contact,
			profile,
			family,
		};
		const include = {
			password: hashedPassword ? true : false,
			contact: allIsNull ? false : true,
			profile: groupId ? true : false,
			family: family ? true : false,
			role: roleId ? true : false,
		};
		return await ctx.prisma.user.update({
			where: { id },
			data,
			include,
		});
	} catch (error) {
		return Promise.reject("error");
	}
}

export async function CreateUser(ctx: Context, userParam: any, userPassword: string) {
	try {
		const hashedPassword = await hashPassword(userPassword);
		const { name, avatar, groupId, roleId, familyId, familyName, ...rest } = userParam;

		const profile = groupId
			? {
					create: {
						createdBy: ctx.user?.id || "",
						group: {
							connect: {
								id: groupId,
							},
						},
					},
			  }
			: undefined;
		const family = familyId
			? {
					connect: {
						id: familyId,
					},
			  }
			: familyName
			? {
					create: {
						createdBy: ctx.user?.id || "",
						familyName,
					},
			  }
			: undefined;
		return await ctx.prisma.user.create({
			data: {
				name,
				avatar,
				role: {
					connect: {
						id: roleId,
					},
				},
				contact: {
					create: {
						...rest,
					},
				},
				profile,
				family,
			},
			include: {
				contact: true,
				profile: groupId ? true : false,
				family: familyName ? true : false,
			},
		});
	} catch (error) {
		console.log("🚀 ~ file: User.ts ~ line 629 ~ CreateUser ~ error", error);
		return Promise.reject("error");
	}
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
				try {
					if (!user) throw new Error("Not Allowed");
					const userQuery: any = await prisma.user.findUniqueOrThrow({
						where: { id },
					});
					return userQuery;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// When a user signs up proper (email + password)
export const userUpdate = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("userUpdate", {
			type: "User",
			args: {
				id: nonNull(stringArg()),
				avatar: stringArg(),
				roleId: intArg(),
				name: stringArg(),
				email: stringArg(),
				password: stringArg(),
				address: stringArg(),
				parentsPhones: stringArg(),
				phone: stringArg(),
				groupId: stringArg(),
				familyName: stringArg(),
			},
			resolve: async (
				_parent,
				{
					id,
					name,
					email,
					password,
					address,
					parentsPhones,
					phone,
					groupId,
					avatar,
					familyName,
					roleId,
				},
				ctx
			) => {
				try {
					const { user, prisma } = ctx || {};
					if (!user) throw new Error("Not Allowed");
					const userQuery = await prisma.user.findUniqueOrThrow({
						where: { id },
					});

					const studentParam = {
						id,
						email,
						address,
						phone,
						parentsPhones: parentsPhones ?? phone,
						name: name ?? email,
						groupId: groupId,
						avatar,
						familyName,
						roleId,
					};

					return await UpdateUser(ctx, studentParam, password);
				} catch (error) {
					return Promise.reject("error");
				}
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
				name: nonNull(stringArg()),
				roleId: nonNull(intArg()),
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
				address: nullable(stringArg()),
				parentsPhones: nullable(stringArg()),
				phone: nullable(stringArg()),
				avatar: nullable(stringArg()),
				groupId: nullable(stringArg()),
				familyName: nullable(stringArg()),
				familyId: nullable(stringArg()),
			},
			resolve: async (
				_parent,
				{
					name,
					email,
					password,
					avatar,
					address,
					parentsPhones,
					phone,
					groupId,
					familyName,
					familyId,
					roleId,
				},
				ctx
			) => {
				try {
					const { user } = ctx || {};
					if (!user) throw new Error("Not Allowed");

					const userParam = {
						avatar,
						email,
						address,
						phone,
						parentsPhones,
						name: name ?? email,
						groupId,
						familyName,
						familyId,
						roleId,
					} as any;

					return await CreateUser(ctx, userParam, password);
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
