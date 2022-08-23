import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, booleanArg } from "nexus";
import { Attendance } from "./Attendance";
import { Profile, ProfilesResponse } from "./Profile";
import { CursorPaginationInput, PaginationInputType, queryArgs } from "./User";

export const paginationResult = async (query: any) => {
	let prevCursor: string | undefined | null;
	let nextCursor: string | undefined | null;

	const result = query;
	if (result && result.length > 0) {
		nextCursor = result[result?.length - 1]?.id;
		prevCursor = result[0]?.id;
	}

	return {
		list: result,
		prevCursor,
		nextCursor,
	};
};

//generates Group type at schema.graphql
export const Group = objectType({
	name: "Group",
	definition(t) {
		t.string("id");
		t.boolean("isActive");
		t.string("name");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.field("startAt", { type: "DateTime" });
		t.field("endAt", { type: "DateTime" });
		t.field("profiles", {
			type: ProfilesResponse,
			args: { data: PaginationInputType },
			async resolve(_parent, args, { user, prisma }) {
				try {
					const { role } = user || {};
					if (!user || (role !== Role.ADMIN && role !== Role.USER)) throw new Error("Not Allowed");
					const { data } = args;

					if (data) {
						const query = await prisma.group
							.findUniqueOrThrow({
								where: {
									id: _parent.id,
								},
							})
							.profiles(queryArgs(data));

						const result = await paginationResult(query);

						if (!data?.myCursor) {
							const {
								_count: { profiles },
							} = await prisma.group.findUniqueOrThrow({
								where: {
									id: _parent.id,
								},
								include: {
									_count: { select: { profiles: true } },
								},
							});
							return { ...result, totalCount: profiles ? { _count: profiles } : undefined };
						}
						return result;
					}
					return await prisma.group
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.profiles();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.list.field("attendance", {
			type: Attendance,
			async resolve(_parent, _args, ctx) {
				try {
					return await ctx.prisma.grade
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.attendance();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("grade", {
			type: "Grade",
			resolve: async ({ id }, _, { prisma }) => {
				try {
					return await prisma.group
						.findUniqueOrThrow({
							where: { id },
						})
						.grade();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get all Groups
export const GroupsQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Groups", {
			type: "Group",
			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

					return await prisma.Group.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get unique Group
export const GroupByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("Group", {
			type: "Group",
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

					return await prisma.Group.findUniqueOrThrow({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//create Group
export const createGroupMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createGroup", {
			type: "Group",
			args: {
				name: nonNull(stringArg()),
				startAt: nullable(arg({ type: "DateTime" })),
				endAt: nullable(arg({ type: "DateTime" })),
				isActive: nullable(booleanArg()),
				gradeId: nullable(stringArg()),
			},
			resolve: async (
				_parent,
				{ name, startAt, endAt, gradeId, isActive = true },
				{ prisma, user }
			) => {
				try {
					if (!user || user.role !== Role.ADMIN) return null;

					const newGroup = {
						name,
						startAt,
						endAt,
						createdBy: user.id,
						isActive,

						grade: {
							connect: {
								id: gradeId,
							},
						},
					};
					return await prisma.Group.create({
						data: newGroup,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Group
export const UpdateGroupMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateGroup", {
			type: "Group",
			args: {
				id: nonNull(stringArg()),
				name: stringArg(),
				startAt: arg({ type: "DateTime" }),
				endAt: arg({ type: "DateTime" }),
				isActive: booleanArg(),
				gradeId: stringArg(),
			},
			resolve: async (_parent, { id, name, startAt, endAt, gradeId, isActive }, { prisma, user }) => {
				try {
					if (!user || user.role !== Role.ADMIN) return null;

					let updateGroup: any = {
						name,
						startAt,
						endAt,
						isActive,
						updatedBy: user.id,
					};

					if (gradeId) {
						updateGroup = {
							...updateGroup,
							grade: {
								connect: {
									id: gradeId,
								},
							},
						};
					}

					return await prisma.Group.update({
						where: { id },
						data: { ...updateGroup },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// delete Group
export const DeleteGroupMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteGroup", {
			type: "Group",
			args: {
				id: nonNull(stringArg()),
			},
			resolve(_parent, { id }, { prisma, user }) {
				try {
					if (!user || user.role !== Role.ADMIN) return null;

					return prisma.Group.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
