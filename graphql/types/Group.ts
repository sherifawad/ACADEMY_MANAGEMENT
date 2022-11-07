import { arg, booleanArg, extendType, nonNull, nullable, objectType, stringArg } from "nexus";
import { PaginationInputType, paginationResult, queryArgs } from ".";
import { ProfilesResponse } from "./Profile";
import { Group as groupType } from "@internal/prisma/client";
import { Grade } from "./Grade";
import { Attendance } from "./Attendance";

//generates Group type at schema.graphql
export const Group = objectType({
	name: "Group",
	definition(t) {
		t.id("id");
		t.boolean("isActive");
		t.string("name");
		t.string("createdBy");
		t.string("updatedBy");
		t.date("createdAt");
		t.date("updatedAt");
		t.date("startAt");
		t.date("endAt");
		t.field("profiles", {
			type: ProfilesResponse,
			args: { data: PaginationInputType },
			async resolve(parent, args, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const { data } = args;

					if (data) {
						const query: any = await prisma.group
							.findUniqueOrThrow({
								where: {
									id: parent.id,
								},
							})
							.profiles(queryArgs(data));

						const result = await paginationResult(query);

						if (!data?.myCursor) {
							const {
								_count: { profiles },
							} = await prisma.group.findUniqueOrThrow({
								where: {
									id: parent.id,
								},
								include: {
									_count: { select: { profiles: true } },
								},
							});
							return { ...result, totalCount: profiles ? { _count: profiles } : undefined };
						}
						return result;
					}
					const query = await prisma.group
						.findUniqueOrThrow({
							where: {
								id: parent.id,
							},
						})
						?.profiles();
					return { list: query };
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.list.field("attendance", {
			type: Attendance,
			async resolve(parent, _args, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.group
						.findUniqueOrThrow({
							where: {
								id: parent.id,
							},
						})
						.attendance();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("grade", {
			type: Grade,
			resolve: async ({ id }, _, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
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
			type: Group,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.group.findMany();
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
			type: Group,
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.group.findUniqueOrThrow({
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
			type: Group,
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
				{ prisma, session }
			) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newGroup = {
						name,
						startAt,
						endAt,
						createdBy: session.user.id,
						isActive,

						grade: {
							connect: {
								id: gradeId,
							},
						},
					} as any;
					return await prisma.group.create({
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
			type: Group,
			args: {
				id: nonNull(stringArg()),
				name: stringArg(),
				startAt: arg({ type: "DateTime" }),
				endAt: arg({ type: "DateTime" }),
				isActive: booleanArg(),
				gradeId: stringArg(),
			},
			resolve: async (
				_parent,
				{ id, name, startAt, endAt, gradeId, isActive },
				{ prisma, session }
			) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					let updateGroup: Omit<
						groupType,
						"id" | "createdAt" | "createdBy" | "gradeId" | "updatedAt"
					> = {
						name,
						startAt,
						endAt,
						isActive,
						updatedBy: session.user.id,
					} as any;

					if (gradeId) {
						updateGroup = {
							...updateGroup,
							grade: {
								connect: {
									id: gradeId,
								},
							},
						} as any;
					}

					return await prisma.group.update({
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
			type: Group,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.group.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
