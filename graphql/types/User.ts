import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { PaginationInputType, queryArgs, StudentsResponse, UsersResponse } from ".";
import { Role } from "./Role";
import { User as userType, Contact as contactType, Group as groupType } from "@prisma/client";
import { Profile } from "./Profile";
import { Contact } from "./Contact";
import { Family } from "./Family";
import { Context } from "../context";
import { isNullish, removeNullObjects } from "utils/objectsUtils";
import prisma from "../../lib/prisma";

export const User = objectType({
	name: "User",
	definition(t) {
		t.id("id");
		t.string("name");
		t.string("email");
		t.field("emailVerified", { type: "DateTime" });
		t.string("image");
		t.boolean("isActive");
		t.int("roleId");
		t.string("familyId");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.field("role", {
			type: Role,
			resolve: async (parent, _, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.user
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.role();
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.nullable.field("profile", {
			type: Profile,
			resolve: async (parent, _, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.user
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.profile();
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.nullable.field("contact", {
			type: Contact,
			resolve: async (parent, _, { prisma, session }) => {
				try {
					//TODO: contacts in student domain and user domain combine domains
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.contact.findUniqueOrThrow({
						where: { id: parent.id },
					});
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.nullable.field("family", {
			type: Family,
			resolve: async (parent, _, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.user
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.family();
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get all Users
export const UsersQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("Users", {
			type: User,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.user.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const FilteredUsersQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("FilteredUsers", {
			type: UsersResponse,
			args: {
				data: PaginationInputType,
				isActive: nullable(booleanArg()),
				roleIds: nullable(list(intArg())),
				family_Id: nullable(stringArg()),
				familyName: nullable(stringArg()),
			},
			resolve: async (_parent, args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const { data, isActive, family_Id, roleIds, familyName } = args;

					let where = {};
					if (roleIds) {
						const orQuery = (roleIds as number[]).map((role) => {
							return { roleId: role };
						});
						where = { ...where, OR: orQuery };
					}
					if (family_Id) {
						where = { ...where, familyId: family_Id };
					}
					if (familyName) {
						where = {
							...where,
							family: {
								familyName: {
									contains: familyName,
									mode: "insensitive",
								},
							},
						};
					}
					if (isActive) {
						where = { ...where, isActive };
					}
					let result: userType[];
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

export const FilteredUsersByPhoneQuery = extendType({
	type: "Query",
	definition(t) {
		t.nullable.list.field("FilteredUsersByPhoneQuery", {
			type: User,
			args: {
				phones: nonNull(list(stringArg())),
				roleId: nonNull(intArg()),
			},
			resolve: async (_parent, args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const { phones, roleId } = args;

					// if (permissionsList.includes("readFamily")) {
					// 	if (!family_Id || family_Id != user.familyId) {
					// 		throw new Error("Not Allowed");
					// 	}
					// }

					// const modifiedList = phone
					// 	.replace(/\s+/g, "")
					// 	.replace(/\D/g, "")
					// 	.match(/.{1,11}/g) as string[];
					const matchers = (phones as string[])?.reduce((acc: any[], current: string) => {
						if (current.length !== 11) return acc;
						switch (roleId) {
							case 4:
								return [
									...acc,
									{
										contact: {
											parentsPhones: {
												contains: current,
											},
										},
									},
								];
							case 5:
								return [
									...acc,
									{
										contact: {
											phone: {
												equals: current,
											},
										},
									},
								];

							default:
								return acc;
						}
					}, []);

					return await prisma.user.findMany({
						where: {
							OR: matchers,
						},
					});
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
			type: StudentsResponse,
			args: {
				data: PaginationInputType,
				isActive: nullable(booleanArg()),
				groupId: nonNull(stringArg()),
				// role: nullable(UserRole),
			},
			resolve: async (_parent, args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
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
					let result: userType[];
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
							groupName = await prisma.group.findUniqueOrThrow({
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
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export type UserParam = Pick<userType, "image" | "name"> &
	Pick<contactType, "parentsPhones" | "address" | "phone"> &
	Partial<Pick<groupType, "id">>;

export type StudentParam = Pick<userType, "name"> &
	Pick<contactType, "parentsPhones" | "address" | "phone"> &
	Partial<Pick<groupType, "id">>;

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
export async function UpdateUser(ctx: Context, studentParam: any) {
	try {
		const { name, id, groupId, roleId, image, familyName, familyId, familyListIds, ...rest } =
			studentParam;

		const role = roleId
			? {
					connect: {
						id: roleId,
					},
			  }
			: undefined;

		let family =
			familyListIds?.length > 0
				? undefined
				: familyName
				? {
						upsert: {
							create: {
								createdBy: ctx.session?.user?.id || "",
								familyName: familyName,
							},
							update: {
								updatedBy: ctx.session?.user?.id || "",
								familyName: familyName,
							},
						},
				  }
				: undefined;

		const profile = groupId
			? {
					upsert: {
						create: {
							createdBy: ctx.session?.user?.id || "",
							group: {
								connect: {
									id: groupId,
								},
							},
						},
						update: {
							updatedBy: ctx.session?.user?.id || "",
							group: {
								connect: {
									id: groupId,
								},
							},
						},
					},
			  }
			: undefined;

		if (roleId === 5 && familyListIds?.length > 0) {
			const getParentFamily = await ctx.prisma.user.findFirst({
				where: {
					id: familyListIds[0],
				},
			});

			if (getParentFamily) {
				family = {
					connect: {
						id: getParentFamily.familyId,
					},
				} as any;
			}
		}

		if (roleId === 4 && familyId) {
			family = {
				connect: {
					id: familyId,
				},
			} as any;
		}

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
			image: image ? image : undefined,
			role,
			contact,
			profile,
			family,
		};
		const include = {
			contact: allIsNull ? false : true,
			profile: profile ? true : false,
			role: role ? true : false,
			family: family ? true : false,
		};
		const updateUser = await ctx.prisma.user.update({
			where: { id },
			data,
			include,
		});

		if (roleId === 4 && familyListIds?.length > 0) {
			if (!familyListIds || familyListIds.length < 1 || roleId !== 4 || roleId !== 5) return updateUser;

			const orObjectList = (familyListIds as string[])?.map((item) => {
				return {
					id: {
						equals: item,
					},
				};
			});
			await ctx.prisma.user.updateMany({
				where: {
					roleId: {
						equals: 5,
					},
					OR: orObjectList,
				},
				data: {
					familyId: updateUser.familyId,
				},
			});
		}

		return updateUser;
	} catch (error) {
		console.log("🚀 ~ file: User.ts ~ line 808 ~ UpdateUser ~ error", error);
		return Promise.reject("error");
	}
}

export async function CreateUser(ctx: Context, userParam: any) {
	try {
		const { name, image, groupId, roleId, familyId, familyName, familyListIds, ...rest } = userParam;

		const profile = groupId
			? {
					create: {
						createdBy: ctx.session?.user?.id || "",
						group: {
							connect: {
								id: groupId,
							},
						},
					},
			  }
			: undefined;

		const role = {
			connect: {
				id: roleId,
			},
		};
		let family =
			familyListIds?.length > 0
				? undefined
				: familyName
				? {
						create: {
							createdBy: ctx.session?.user?.id || "",
							familyName,
						},
				  }
				: undefined;

		if (roleId === 5 && familyListIds?.length > 0) {
			const getParentFamily = await ctx.prisma.user.findFirst({
				where: {
					id: familyListIds[0],
				},
			});

			if (getParentFamily) {
				family = {
					connect: {
						id: getParentFamily.familyId,
					},
				} as any;
			}
		}

		if (roleId === 4 && familyId) {
			family = {
				connect: {
					id: familyId,
				},
			} as any;
		}
		const newUser = await ctx.prisma.user.create({
			data: {
				name,
				image,
				Contact: {
					create: {
						...rest,
					},
				},
				profile,
				family,
				role,
			},
			include: {
				Contact: true,
				role: true,
				profile: groupId ? true : false,
				family: familyName ? true : false,
			},
		});

		if (roleId === 4 && familyListIds?.length > 0) {
			if (!familyListIds || familyListIds.length < 1 || roleId !== 4 || roleId !== 5) return newUser;

			const orObjectList = (familyListIds as string[])?.map((item) => {
				return {
					id: {
						equals: item,
					},
				};
			});
			await ctx.prisma.user.updateMany({
				where: {
					roleId: {
						equals: 5,
					},
					OR: orObjectList,
				},
				data: {
					familyId: newUser.familyId,
				},
			});
		}

		return newUser;
	} catch (error) {
		console.log("🚀 ~ file: User.ts ~ line 629 ~ CreateUser ~ error", error);
		return Promise.reject("error");
	}
}
//get unique User
export const UserByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("User", {
			type: User,
			args: { id: nonNull(stringArg()), take: nullable(intArg()) },
			resolve: async (_parent, { id }, { session, prisma }) => {
				try {
					const { role = null } = session || {};
					if (!role) throw new Error("Not Allowed");
					const output: any = await prisma.user.findUniqueOrThrow({
						where: { id },
					});
					return output;
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
			type: User,
			args: {
				id: nonNull(stringArg()),
				image: stringArg(),
				roleId: intArg(),
				name: stringArg(),
				email: stringArg(),
				address: stringArg(),
				parentsPhones: stringArg(),
				phone: stringArg(),
				groupId: stringArg(),
				familyName: stringArg(),
				familyId: stringArg(),
				familyListIds: list(stringArg()),
			},
			resolve: async (
				_parent,
				{
					id,
					name,
					email,
					address,
					parentsPhones,
					phone,
					groupId,
					image,
					familyName,
					roleId,
					familyId,
					familyListIds,
				},
				ctx
			) => {
				try {
					const { session, prisma } = ctx || {};
					const { role = null } = session || {};
					if (!role) throw new Error("Not Allowed");

					const studentParam = {
						id,
						email,
						address,
						phone,
						parentsPhones,
						name,
						groupId,
						image,
						familyName,
						roleId,
						familyId,
						familyListIds,
					};

					return await UpdateUser(ctx, studentParam);
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
			type: User,
			args: {
				name: nonNull(stringArg()),
				roleId: nonNull(intArg()),
				email: nullable(stringArg()),
				address: nullable(stringArg()),
				parentsPhones: nullable(stringArg()),
				phone: nullable(stringArg()),
				avatar: nullable(stringArg()),
				groupId: nullable(stringArg()),
				familyName: nullable(stringArg()),
				familyId: nullable(stringArg()),
				familyListIds: nullable(list(stringArg())),
			},
			resolve: async (
				_parent,
				{
					name,
					email,
					avatar,
					address,
					parentsPhones,
					phone,
					groupId,
					familyName,
					familyId,
					roleId,
					familyListIds,
				},
				ctx
			) => {
				try {
					const { prisma, session } = ctx || {};
					const { role = null } = session || {};
					if (!role) throw new Error("Not Allowed");
					const userParam = {
						avatar,
						email,
						address,
						phone,
						parentsPhones,
						name: name,
						groupId,
						familyName,
						familyId,
						roleId,
						familyListIds,
					} as any;

					return await CreateUser(ctx, userParam);
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
