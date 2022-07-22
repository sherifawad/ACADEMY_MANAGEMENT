import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable } from "nexus";
import { Attendance } from "./Attendance";
import { Exam } from "./Exam";
import { queryArgs, User, UsersFilterInputType } from "./User";

//generates Profile type at schema.graphql
export const Profile = objectType({
	name: "Profile",
	definition(t) {
		t.string("id");
		t.string("bio");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("exams", {
			type: Exam,
			args: { take: nullable(intArg()) },
			async resolve(_parent, { take }, ctx) {
				return await ctx.prisma.profile
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.exams({ take });
			},
		});
		t.field("user", {
			type: User,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.profile
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.user();
			},
		});
		t.list.field("attendances", {
			type: Attendance,
			args: { take: nullable(intArg()) },
			async resolve(_parent, { take }, ctx) {
				return await ctx.prisma.profile
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.attendances({ take });
			},
		});
		t.field("group", {
			type: "Group",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.profile
					.findUnique({
						where: { id },
					})
					.group();
			},
		});
	},
});

//get all Profiles
export const ProfilesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Profiles", {
			type: "Profile",
			resolve: async (_parent, _args, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;
				return await prisma.profile.findMany();
			},
		});
	},
});

//get unique Profile
export const ProfileByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("Profile", {
			type: "Profile",
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, user }) => {
				if (!user || (user.id !== id && user.role !== Role.ADMIN)) return null;
				return await prisma.profile.findUnique({
					where: { id },
				});
			},
		});
	},
});

//get user attendance
export const ProfileAttendancesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Attendances", {
			type: "Attendance",
			args: { studentId: nonNull(stringArg()) },

			resolve: async (_parent, { studentId }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.attendance
					.findMany({
						where: { profileId: studentId },
					})
					.attendances();
			},
		});
	},
});

//create Profile
export const createProfileMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createProfile", {
			type: "Profile",
			args: {
				id: nonNull(stringArg()),
				bio: stringArg(),
			},
			resolve: async (_parent, { id, bio }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				const newProfile = {
					id,
					bio,
					createdBy: user.id,
				};
				return await prisma.profile.create({
					data: newProfile,
				});
			},
		});
	},
});

// update Profile
export const UpdateProfileMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateProfile", {
			type: "Profile",
			args: {
				id: nonNull(stringArg()),
				bio: stringArg(),
			},
			resolve: async (_parent, { id, bio }, { prisma, user }) => {
				if (!user || user.id !== id || user.role !== Role.ADMIN) return null;

				const updateProfile = {
					bio,
					updatedBy: user.id,
				};
				return await prisma.profile.update({
					where: { id },
					data: { ...updateProfile },
				});
			},
		});
	},
});

// delete Profile
export const DeleteProfileMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteProfile", {
			type: "Profile",
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, user }) {
				if (!user || user.id !== id || user.role !== Role.ADMIN) return null;

				return await prisma.profile.delete({
					where: { id },
				});
			},
		});
	},
});
