import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg } from "nexus";
import { Attendance } from "./Attendance";
import { Exam } from "./Exam";
import { queryArgs, User } from "./User";

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
			args: { take: nullable(intArg()), orderByList: nullable(arg({ type: "JSONObject" })) },
			async resolve(_parent, { take, orderByList }, { user, prisma }) {
				try {
					const isEmpty = !orderByList || Object.keys(orderByList).length === 0;
					let orderList: { [x: string]: string }[];
					if (isEmpty) {
						orderList = [{ date: "desc" }, { createdAt: "desc" }, { updatedAt: "desc" }];
					} else {
						orderList = Object.entries(orderByList).reduce<{ [x: string]: string }[]>(
							(acc, [key, value]) => {
								if (typeof value === "string" || value instanceof String) {
									return [...acc, { [key]: String(value) }];
								}
								return acc;
							},
							[]
						);
					}
					return await prisma.profile
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.exams({
							take: take,
							orderBy: orderList,
						});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("user", {
			type: User,
			async resolve(_parent, _args, { user, prisma }) {
				try {
					return await prisma.profile
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.user();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.list.field("attendances", {
			type: Attendance,
			args: { take: nullable(intArg()), orderByList: nullable(arg({ type: "JSONObject" })) },
			async resolve(_parent, { take, orderByList }, { user, prisma }) {
				try {
					const isEmpty = !orderByList || Object.keys(orderByList).length === 0;
					let orderList: { [x: string]: string }[];
					if (isEmpty) {
						orderList = [{ startAt: "desc" }, { endAt: "desc" }];
					} else {
						orderList = Object.entries(orderByList).reduce<{ [x: string]: string }[]>(
							(acc, [key, value]) => {
								if (typeof value === "string" || value instanceof String) {
									return [...acc, { [key]: String(value) }];
								}
								return acc;
							},
							[]
						);
					}
					return await prisma.profile
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.attendances({
							take,
							orderBy: orderList,
						});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("group", {
			type: "Group",
			resolve: async ({ id }, _, { user, prisma }) => {
				try {
					return await prisma.profile
						.findUniqueOrThrow({
							where: { id },
						})
						.group();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const Count = objectType({
	name: "Count",
	definition(t) {
		t.int("_count");
	},
});

export const ProfilesResponse = objectType({
	name: "ProfilesResponse",
	definition(t) {
		t.list.field("list", {
			type: Profile,
		});
		t.string("prevCursor");
		t.nullable.string("nextCursor");
		t.nullable.field("totalCount", { type: Count });
	},
});

//get all Profiles
export const ProfilesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Profiles", {
			type: "Profile",
			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					return await prisma.profile.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					return await prisma.profile.findUniqueOrThrow({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					return await prisma.attendance
						.findMany({
							where: { profileId: studentId },
						})
						.attendances();
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					const newProfile = {
						id,
						bio,
						createdBy: user.id,
					};
					return await prisma.profile.create({
						data: newProfile,
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					//TODO: role recheck

					const updateProfile = {
						bio,
						updatedBy: user.id,
					};
					return await prisma.profile.update({
						where: { id },
						data: { ...updateProfile },
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					//TODO: role recheck

					return await prisma.profile.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
