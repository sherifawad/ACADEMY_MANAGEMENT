import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core, list } from "nexus";
// @ts-ignore
import { prismaOffsetPagination } from "prisma-offset-pagination";
import { getDomainPermissions } from "../../utils/utils";
import { PaginationInputType, queryArgs } from "./User";

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
	note?: string | null; // Skip the cursor
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
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const profileResult = await prisma.attendance
						.findUniqueOrThrow({
							where: { id },
						})
						.profile();
					if (permissionsList.includes("readSelf")) {
						if (id !== user.id) {
							throw new Error("Not Allowed");
						}
						return profileResult;
					}

					if (permissionsList.includes("readFamily")) {
						const familyId = await prisma.findUniqueOrThrow({
							where: { id },
						})?.familyId;
						if (!familyId || familyId != user.familyId) {
							throw new Error("Not Allowed");
						} else {
							return profileResult;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return profileResult;
					}
					throw new Error("Not Allowed");
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("group", {
			type: "Group",
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
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
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const Result = await prisma.attendance.findMany({
						where: { profileId: id, startAt: { gte: date } },
					});
					if (permissionsList.includes("readSelf")) {
						if (id !== user.id) {
							throw new Error("Not Allowed");
						}
						return Result;
					}

					if (permissionsList.includes("readFamily")) {
						const familyId = await prisma.findUniqueOrThrow({
							where: { id },
						})?.familyId;
						if (!familyId || familyId != user.familyId) {
							throw new Error("Not Allowed");
						} else {
							return Result;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return Result;
					}
					throw new Error("Not Allowed");
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
			type: "AttendanceResponse",
			args: {
				data: PaginationInputType,
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, args, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const { data, studentId } = args;

					let where = {};
					if (studentId) {
						where = {
							...where,
							Profile: { id: studentId },
						};
					}
					let result: attendance[];
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
						result = await prisma.user.findMany({
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

					if (permissionsList.includes("readSelf")) {
						if (studentId !== user.id) {
							throw new Error("Not Allowed");
						}
						return outPut;
					}

					if (permissionsList.includes("readFamily")) {
						const familyId = await prisma.findUniqueOrThrow({
							where: { studentId },
						})?.familyId;
						if (!familyId || familyId != user.familyId) {
							throw new Error("Not Allowed");
						} else {
							return outPut;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return outPut;
					}
					throw new Error("Not Allowed");
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
			type: "AttendancesCount",
			args: {
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, { studentId }, { prisma, user }) => {
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
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const output = await prisma.attendance.findMany({
						skip,
						take,
						where: {
							Profile: { id: studentId },
						},
					});
					if (permissionsList.includes("readSelf")) {
						if (studentId !== user.id) {
							throw new Error("Not Allowed");
						}
						return output;
					}

					if (permissionsList.includes("readFamily")) {
						const familyId = await prisma.findUniqueOrThrow({
							where: { studentId },
						})?.familyId;
						if (!familyId || familyId != user.familyId) {
							throw new Error("Not Allowed");
						} else {
							return output;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return output;
					}
					throw new Error("Not Allowed");
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
			type: "Attendance",
			args: {
				startAt: nonNull(arg({ type: "DateTime" })),
				endAt: nullable(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
				profileId: nonNull(stringArg()),
			},
			resolve: async (_parent, { startAt, endAt, note, profileId }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const newAttendance = {
						startAt,
						endAt,
						note,
						profileId,
						createdBy: user.id,
					};

					if (permissionsList.includes("full") || permissionsList.includes("create")) {
						return await prisma.attendance.create({
							data: newAttendance,
						});
					}
					throw new Error("Not Allowed");
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
			type: "AttendancesCUResponse",
			args: {
				startAt: nonNull(arg({ type: "DateTime" })),
				endAt: nullable(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
				profileIds: nonNull(list(nonNull(stringArg()))),
			},
			resolve: async (_parent, { startAt, endAt, note, profileIds }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const newAttendances: Omit<attendance, "id">[] = [];
					profileIds.forEach((id: string) =>
						newAttendances.push({
							startAt,
							endAt,
							note,
							profileId: id,
							createdBy: user.id,
						})
					);

					if (permissionsList.includes("full") || permissionsList.includes("create")) {
						return await prisma.attendance.createMany({
							data: newAttendances,
							skipDuplicates: true,
						});
					}
					throw new Error("Not Allowed");
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
			type: "Attendance",
			args: {
				id: nonNull(stringArg()),
				startAt: arg({ type: "DateTime" }),
				endAt: arg({ type: "DateTime" }),
				note: stringArg(),
				profileId: stringArg(),
			},
			resolve: async (_parent, { id, startAt, endAt, note, profileId }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
					const updateAttendance = {
						startAt,
						endAt,
						note,
						profileId,
						updatedBy: user.id,
					};
					if (permissionsList.includes("editSelf")) {
						if (id !== user.id) {
							throw new Error("Not Allowed");
						}
						return await prisma.attendance.update({
							where: { id },
							data: { ...updateAttendance },
						});
					}
					if (permissionsList.includes("full") || permissionsList.includes("edit")) {
						return await prisma.attendance.update({
							where: { id },
							data: { ...updateAttendance },
						});
					}
					throw new Error("Not Allowed");
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
			type: "AttendancesCUResponse",
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
				{ prisma, user }
			) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");
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
						updatedBy: user.id,
					};
					const where = {
						AND: ANDConditions,
						OR: ORConditions,
					};

					if (permissionsList.includes("full") || permissionsList.includes("edit")) {
						return await prisma.attendance.updateMany({
							where,
							data: updateAttendance,
						});
					}
					throw new Error("Not Allowed");
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
			type: "Attendance",
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, user }) {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(3, 7);
					if (!permissionsList) throw new Error("Not Allowed");

					if (permissionsList.includes("deleteSelf")) {
						if (id !== user.id) {
							throw new Error("Not Allowed");
						}
						return await prisma.attendance.delete({
							where: { id },
						});
					}
					if (permissionsList.includes("full") || permissionsList.includes("delete")) {
						return await prisma.attendance.delete({
							where: { id },
						});
					}
					throw new Error("Not Allowed");
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
