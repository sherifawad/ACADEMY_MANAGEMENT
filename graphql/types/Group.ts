import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg } from "nexus";
import { Attendance } from "./Attendance";
import { Profile } from "./Profile";

//generates Group type at schema.graphql
export const Group = objectType({
	name: "Group",
	definition(t) {
		t.string("id");
		t.string("name");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.string("startAt");
		t.string("endAt");
		t.list.field("profiles", {
			type: Profile,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.grade
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.profiles();
			},
		});
		t.list.field("attendance", {
			type: Attendance,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.grade
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.attendance();
			},
		});
		t.field("grade", {
			type: "Grade",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.group
					.findUnique({
						where: { id },
					})
					.grade();
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
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.Group.findMany();
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
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.Group.findUnique({
					where: { id },
				});
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
			},
			resolve: async (_parent, { name, startAt, endAt }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const newGroup = {
					name,
					startAt,
					endAt,
				};
				return await prisma.Group.create({
					data: newGroup,
				});
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
			},
			resolve: async (_parent, { id, name, startAt, endAt }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const updateGroup = {
					name,
					startAt,
					endAt,
				};
				return await prisma.Group.update({
					where: { id },
					data: { ...updateGroup },
				});
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
				if (!user || user.role !== Role.ADMIN) return null;

				return prisma.Group.delete({
					where: { id },
				});
			},
		});
	},
});
