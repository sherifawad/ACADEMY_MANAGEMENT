import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { Count, PaginationInputType, queryArgs } from ".";
import { Group } from "./Group";
import { Profile } from "./Profile";
// import { Attendance as attendanceType } from "@internal/prisma/client";
import { Attendance as attendanceType } from "@prisma/client";

export interface prismaCursorPagination {
	take: number;
	skip?: number; // Skip the cursor
	cursor?: {
		id: string;
	};
	where: {
		Profile: { id: string };
	};
	orderBy?: { [x: string]: string };
}

export const AttendanceResponse = objectType({
	name: "AttendanceResponse",
	definition(t) {
		t.list.field("list", {
			type: Attendance,
		});
		t.string("prevCursor");
		t.string("nextCursor");
		t.field("totalCount", { type: AttendancesCount });
	},
});

//generates Exam type at schema.graphql
export const Attendance = objectType({
	name: "Attendance",
	definition(t) {
		t.id("id");
		t.string("note");
		t.string("profileId");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("startAt", { type: "DateTime" });
		t.field("endAt", { type: "DateTime" });
		t.field("profile", {
			type: Profile,
			resolve: async (parent, _, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const profileResult = await prisma.attendance
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.Profile();
					return profileResult;
					throw new Error("Not Allowed");
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("group", {
			type: Group,
			resolve: async ({ id }, _, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.attendance
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

export const pageEdges = objectType({
	name: "pageEdges",
	definition(t) {
		t.string("cursor");
		t.field("node", {
			type: Attendance,
		});
	},
});

export const PageCursor = objectType({
	name: "PageCursor",
	definition(t) {
		t.string("cursor");
		t.int("page");
		t.boolean("isCurrent");
	},
});

export const pageCursors = objectType({
	name: "pageCursors",
	definition(t) {
		t.field("first", {
			type: PageCursor,
		});
		t.field("previous", {
			type: PageCursor,
		});
		t.list.field("around", {
			type: PageCursor,
		});
		t.field("next", {
			type: PageCursor,
		});
		t.field("last", {
			type: PageCursor,
		});
	},
});

// export const AttendanceResponse = objectType({
// 	name: "AttendanceResponse",
// 	definition(t) {
// 		t.list.field("pageEdges", {
// 			type: pageEdges,
// 		});
// 		t.field("pageCursors", { type: pageCursors });
// 		t.int("totalCount");
// 	},
// });

export const AttendancesCount = objectType({
	name: "AttendancesCount",
	definition(t) {
		t.int("_count");
	},
});

export const AttendancesCUResponse = objectType({
	name: "AttendancesCUResponse",
	definition(t) {
		t.int("count");
	},
});

// const dateTimeArg = (opts: core.NexusArgConfig<"DateTime">) => arg({ ...opts, type: "DateTime" });

//get unique Attendance by date
export const AttendanceByUserDateQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("AttendanceInDate", {
			type: Attendance,
			args: {
				id: nonNull(stringArg()),
				date: nonNull(arg({ type: "DateTime" })),
			},
			resolve: async (_parent, { id, date }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const Result = await prisma.attendance.findMany({
						where: { profileId: id, startAt: { gte: date } },
					});
					return Result;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const AttendanceByUserIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("studentAttendances", {
			type: AttendanceResponse,
			args: {
				data: PaginationInputType,
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const { data, studentId } = args;

					let where = {};
					if (studentId) {
						where = {
							...where,
							Profile: { id: studentId },
						};
					}
					let result: attendanceType[];
					let totalCount: { _count: number } | undefined | null;
					let nextCursor: string | undefined | null;
					let prevCursor: string | undefined | null;
					if (data) {
						result = await prisma.attendance.findMany(queryArgs(data, where));

						nextCursor = result[result?.length - 1]?.id;
						prevCursor = result[0]?.id;

						if (!data?.myCursor) {
							totalCount = await prisma.attendance.aggregate({
								where: {
									Profile: { id: studentId },
								},
								_count: true,
							});
						}
					} else {
						result = await prisma.attendance.findMany({
							where: {
								Profile: { id: studentId },
							},
						});
					}

					const outPut = {
						list: result,
						prevCursor,
						nextCursor,
						totalCount,
					};

					return outPut;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const UserAttendancesCount = extendType({
	type: "Query",
	definition(t) {
		t.field("AttendancesCount", {
			type: Count,
			args: {
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, { studentId }, { prisma, session }) => {
				return await prisma.attendance.aggregate({
					where: {
						Profile: { id: studentId },
					},
					_count: true,
				});
			},
		});
	},
});

export const AttendanceByUserQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("Attendances", {
			type: Attendance,
			args: {
				studentId: nonNull(stringArg()),
				skip: nullable(intArg()),
				take: nullable(intArg()),
			},
			resolve: async (_parent, { studentId, take, skip }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output: attendanceType[] = await prisma.attendance.findMany({
						skip: skip ?? 1,
						take: take ?? 1,
						where: {
							Profile: { id: studentId },
						},
					});
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//create Attendance
export const createAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createAttendance", {
			type: Attendance,
			args: {
				startAt: nonNull(arg({ type: "DateTime" })),
				endAt: nullable(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
				profileId: nonNull(stringArg()),
			},
			resolve: async (_parent, { startAt, endAt, note, profileId }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newAttendance = {
						startAt,
						endAt,
						note,
						profileId,
						createdBy: session.user.id,
					};

					return await prisma.attendance.create({
						data: newAttendance,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//create Multiple Attendance
export const createMultipleAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("createMultipleAttendance", {
			type: AttendancesCUResponse,
			args: {
				startAt: nonNull(arg({ type: "DateTime" })),
				endAt: nullable(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
				profileIds: nonNull(list(nonNull(stringArg()))),
			},
			resolve: async (_parent, { startAt, endAt, note, profileIds }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newAttendances: Omit<attendanceType, "id" | "updatedBy" | "groupId">[] = [];
					profileIds.forEach((id: string) =>
						newAttendances.push({
							startAt,
							endAt,
							note: note ?? null,
							profileId: id,
							createdBy: session.user.id,
						})
					);

					return await prisma.attendance.createMany({
						data: newAttendances,
						skipDuplicates: true,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Attendance
export const UpdateAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateAttendance", {
			type: Attendance,
			args: {
				id: nonNull(stringArg()),
				startAt: arg({ type: "DateTime" }),
				endAt: arg({ type: "DateTime" }),
				note: stringArg(),
				profileId: stringArg(),
			},
			resolve: async (_parent, { id, startAt, endAt, note, profileId }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const updateAttendance = {
						startAt,
						endAt,
						note,
						profileId,
						updatedBy: session.user.id,
					} as any;
					return await prisma.attendance.update({
						where: { id },
						data: { ...updateAttendance },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Multiple Attendance
export const UpdateMultipleAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateMultipleAttendance", {
			type: AttendancesCUResponse,
			args: {
				startAtCondition: nonNull(arg({ type: "DateTime" })),
				endAtCondition: arg({ type: "DateTime" }),
				noteCondition: stringArg(),
				startAt: arg({ type: "DateTime" }),
				endAt: arg({ type: "DateTime" }),
				note: stringArg(),
				profileIds: nonNull(list(nonNull(stringArg()))),
			},
			resolve: async (
				_parent,
				{ startAtCondition, endAtCondition, noteCondition, startAt, endAt, note, profileIds },
				{ prisma, session }
			) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const ANDConditions = [];
					if (startAtCondition) {
						ANDConditions.push({ startAt: startAtCondition });
					}
					if (endAtCondition) {
						ANDConditions.push({ endAt: endAtCondition });
					}
					if (noteCondition) {
						ANDConditions.push({ note: { contains: noteCondition } });
					}
					const ORConditions: { profileId: string }[] = [];
					profileIds.forEach((id: string) => ORConditions.push({ profileId: id }));

					const updateAttendance = {
						startAt,
						endAt,
						note,
						updatedBy: session.user.id,
					};
					const where = {
						AND: ANDConditions,
						OR: ORConditions,
					};

					return await prisma.attendance.updateMany({
						where,
						data: updateAttendance,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// delete Attendance
export const DeleteAttendanceMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteAttendance", {
			type: Attendance,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");

					return await prisma.attendance.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
