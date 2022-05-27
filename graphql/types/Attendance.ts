import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core } from "nexus";

//generates Exam type at schema.graphql
export const Attendance = objectType({
	name: "Attendance",
	definition(t) {
		t.string("id");
		t.string("note");
		t.string("profileId");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("startAt", { type: "DateTime" });
		t.field("endAt", { type: "DateTime" });
		t.field("profile", {
			type: "Profile",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.attendance
					.findUnique({
						where: { id },
					})
					.profile();
			},
		});
		t.field("group", {
			type: "Group",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.attendance
					.findUnique({
						where: { id },
					})
					.group();
			},
		});
	},
});

// const dateTimeArg = (opts: core.NexusArgConfig<"DateTime">) => arg({ ...opts, type: "DateTime" });

//get unique Attendance by date
export const AttendanceByUserDateQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("AttendanceInDate", {
			type: "Attendance",
			args: {
				id: nonNull(stringArg()),
				date: nonNull(arg({ type: "DateTime" })),
			},
			resolve: async (_parent, { id, date }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.attendance.findMany({
					where: { profileId: id, startAt: { gte: date } },
				});
			},
		});
	},
});

//create Attendance
export const createAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createAttendance", {
			type: "Attendance",
			args: {
				startAt: nonNull(arg({ type: "DateTime" })),
				endAt: nullable(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
				profileId: nonNull(stringArg()),
			},
			resolve: async (_parent, { startAt, endAt, note, profileId }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				const newAttendance = {
					startAt,
					endAt,
					note,
					profileId,
					createdBy: user.id,
				};
				return await prisma.attendance.create({
					data: newAttendance,
				});
			},
		});
	},
});

// update Attendance
export const UpdateAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateAttendance", {
			type: "Attendance",
			args: {
				id: nonNull(stringArg()),
				startAt: arg({ type: "DateTime" }),
				endAt: arg({ type: "DateTime" }),
				note: stringArg(),
				profileId: stringArg(),
			},
			resolve: async (_parent, { id, startAt, endAt, note, profileId }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const updateAttendance = {
					startAt,
					endAt,
					note,
					profileId,
					updatedBy: user.id,
				};
				return await prisma.attendance.update({
					where: { id },
					data: { ...updateAttendance },
				});
			},
		});
	},
});

// delete Attendance
export const DeleteAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteAttendance", {
			type: "Attendance",
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, user }) {
				if (!user || user.role !== Role.ADMIN) return null;

				return await prisma.attendance.delete({
					where: { id },
				});
			},
		});
	},
});
