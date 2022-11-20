import { arg, extendType, intArg, nonNull, nullable, objectType, stringArg } from "nexus";
import { Count } from ".";
import { Attendance } from "./Attendance";
import { Exam } from "./Exam";
import { Group } from "./Group";
import { User } from "./User";
import { Profile as profileType } from "@prisma/client";

export const Profile = objectType({
	name: "Profile",
	definition(t) {
		t.id("id");
		t.string("bio");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("exams", {
			type: Exam,
			args: { take: nullable(intArg()), orderByList: nullable(arg({ type: "JSONObject" })) },
			async resolve(parent, { take, orderByList }, { session, prisma }) {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
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
					const output = await prisma.profile
						.findUniqueOrThrow({
							where: {
								id: parent.id,
							},
						})
						.exams({
							take: take ?? 0,
							orderBy: orderList,
						});
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("user", {
			type: User,
			async resolve(parent, _args, { session, prisma }) {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					const output = await prisma.profile
						.findUniqueOrThrow({
							where: {
								id: parent.id,
							},
						})
						.user();
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.list.field("attendances", {
			type: Attendance,
			args: { take: nullable(intArg()), orderByList: nullable(arg({ type: "JSONObject" })) },
			async resolve(parent, { take, orderByList }, { session, prisma }) {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
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
					const output = await prisma.profile
						.findUniqueOrThrow({
							where: {
								id: parent.id,
							},
						})
						.attendances({
							take: take ?? 0,
							orderBy: orderList,
						});

					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("group", {
			type: Group,
			resolve: async ({ id }, _, { session, prisma }) => {
				try {
					const { role = null } = session || {};
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

export const ProfilesResponse = objectType({
	name: "ProfilesResponse",
	definition(t) {
		t.list.field("list", {
			type: Profile,
		});
		t.nullable.string("prevCursor");
		t.nullable.string("nextCursor");
		t.nullable.field("totalCount", { type: Count });
	},
});

//get all Profiles
export const ProfilesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Profiles", {
			type: Profile,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
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
			type: Profile,
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					const output = await prisma.profile.findUniqueOrThrow({
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

//get user attendance
export const ProfileAttendancesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Attendances", {
			type: Attendance,
			args: { studentId: nonNull(stringArg()) },

			resolve: async (_parent, { studentId }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					const output = await prisma.attendance.findMany({
						where: { profileId: studentId },
					});
					return output;
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
			type: Profile,
			args: {
				id: nonNull(stringArg()),
				bio: stringArg(),
			},
			resolve: async (_parent, { id, bio }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					const newProfile: Omit<profileType, "createdAt" | "updatedAt" | "updatedBy" | "groupId"> =
						{
							id,
							bio: bio ?? null,
							createdBy: session.user.id,
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
			type: Profile,
			args: {
				id: nonNull(stringArg()),
				bio: stringArg(),
			},
			resolve: async (_parent, { id, bio }, { prisma, session }) => {
				try {
					//TODO: role recheck

					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");

					const updateProfile = {
						bio,
						updatedBy: session.user.id,
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
			type: Profile,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					//TODO: role recheck

					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");

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
