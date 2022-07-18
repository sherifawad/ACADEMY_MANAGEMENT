import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core } from "nexus";
// @ts-ignore
import { prismaOffsetPagination } from "prisma-offset-pagination";

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

export interface attendance {
	id: string;
	note?: string; // Skip the cursor
	profileId: string; // Skip the cursor
	createdBy?: string; // Skip the cursor
	updatedBy?: string; // Skip the cursor
	startAt: Date; // Skip the cursor
	endAt?: Date; // Skip the cursor
	profile?: any; // Skip the cursor
	group?: any; // Skip the cursor
}

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

// export const AttendanceByUserIdQuery = extendType({
// 	type: "Query",
// 	definition(t) {
// 		t.field("PaginatedAttendances", {
// 			type: "AttendanceResponse",
// 			args: {
// 				studentId: nonNull(stringArg()),
// 				myCursor: nullable(stringArg()),
// 				orderByKey: nullable(stringArg()),
// 				orderDirection: nullable(stringArg()),
// 				size: nullable(intArg()),
// 				buttonNum: nullable(intArg()),
// 			},
// 			resolve: async (
// 				_parent,
// 				{ studentId, size, buttonNum, myCursor, orderByKey, orderDirection },
// 				{ prisma, user }
// 			) => {
// 				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId))
// 					return null;

// 				return await prismaOffsetPagination({
// 					cursor: cursor,
// 					size: Number(size),
// 					buttonNum: Number(buttonNum),
// 					orderBy,
// 					orderDirection,
// 					model: Attendance,
// 					prisma: prisma,
// 					where: {
// 						Profile: { id: studentId },
// 					},
// 				});
// 			},
// 		});
// 	},
// });

export const AttendanceByUserIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("PaginatedAttendances", {
			type: "AttendanceResponse",
			args: {
				studentId: nonNull(stringArg()),
				myCursor: nullable(stringArg()),
				orderByKey: nullable(stringArg()),
				orderDirection: nullable(stringArg()),
				size: nullable(intArg()),
				skip: nullable(intArg()),
			},
			resolve: async (
				_parent,
				{ studentId, size, myCursor, orderByKey, orderDirection, skip },
				{ prisma, user }
			) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId))
					return null;

				let data: prismaCursorPagination = {
					take: Number(size),
					where: {
						Profile: { id: studentId },
					},
				};

				if (myCursor) {
					data = {
						...data,
						skip: Number(size) > 0 ? 1 : 0, // Skip the cursor
						cursor: {
							id: myCursor,
						},
					};
				}

				if (skip) {
					data = {
						...data,
						skip,
					};
				}

				if (orderByKey && orderDirection) {
					data = { ...data, orderBy: { [orderByKey]: orderDirection } };
				}

				const result: attendance[] = await prisma.attendance.findMany(data);
				let totalCount: { _count: number } | undefined | null;
				let prevCursor: string | undefined | null;
				const nextCursor: string | undefined | null = result[result?.length - 1]?.id;

				if (!myCursor) {
					totalCount = await prisma.attendance.aggregate({
						where: {
							Profile: { id: studentId },
						},
						_count: true,
					});

					prevCursor = null;
				} else {
					prevCursor = myCursor;
				}
				return {
					list: result,
					prevCursor,
					nextCursor,
					totalCount,
				};
			},
		});
	},
});

export const UserAttendancesCount = extendType({
	type: "Query",
	definition(t) {
		t.field("AttendancesCount", {
			type: "AttendancesCount",
			args: {
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, { studentId }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId))
					return null;
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
			type: "Attendance",
			args: {
				studentId: nonNull(stringArg()),
				skip: nullable(intArg()),
				take: nullable(intArg()),
			},
			resolve: async (_parent, { studentId, take, skip = 1 }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId))
					return null;

				return await prisma.attendance.findMany({
					skip,
					take,
					where: {
						Profile: { id: studentId },
					},
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
