import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable } from "nexus";
import { Attendance } from "./Attendance";
import { Exam } from "./Exam";
import { User } from "./User";

//generates Profile type at schema.graphql
export const Profile = objectType({
	name: "Profile",
	definition(t) {
		t.string("id");
		t.string("bio");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("exams", {
			type: Exam,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.profile
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.exams();
			},
		});
		t.list.field("users", {
			type: User,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.profile
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.users();
			},
		});
		t.list.field("attendances", {
			type: Attendance,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.profile
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.attendances();
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
				if (!user || user.id !== id || user.role !== Role.ADMIN) return null;
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
			args: { id: nonNull(stringArg()) },

			resolve: async (_parent, { id }, { prisma, user }) => {
				if (!user || user.role !== Role.USER || user.role !== Role.ADMIN) return null;

				return await prisma.attendance
					.findMany({
						where: { profileId: id },
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
				if (!user || user.id !== Role.USER || user.role !== Role.ADMIN) return null;

				const newProfile = {
					id,
					bio,
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
			resolve(_parent, { id }, { prisma, user }) {
				if (!user || user.id !== id || user.role !== Role.ADMIN) return null;

				return prisma.profile.delete({
					where: { id },
				});
			},
		});
	},
});
