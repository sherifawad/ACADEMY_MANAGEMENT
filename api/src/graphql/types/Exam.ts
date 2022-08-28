import { Exam as studentExam, Role } from "@internal/prisma/client";
import {
	nonNull,
	objectType,
	stringArg,
	extendType,
	intArg,
	nullable,
	arg,
	floatArg,
	list,
	inputObjectType,
} from "nexus";
import { PaginationInputType, queryArgs } from "./User";

export interface exam {
	id: string;
	note?: string | null; // Skip the cursor
	profileId: string; // Skip the cursor
	createdBy?: string; // Skip the cursor
	updatedBy?: string; // Skip the cursor
	date: Date; // Skip the cursor
	score: number; // Skip the cursor
	profile?: any; // Skip the cursor
}

//generates Exam type at schema.graphql
export const Exam = objectType({
	name: "Exam",
	definition(t) {
		t.string("id");
		t.string("profileId");
		t.string("note");
		t.float("score");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.field("date", { type: "DateTime" });
		t.field("profile", {
			type: "Profile",
			resolve: async (parent, _, { user, prisma }) => {
				try {
					const { role, id } = user || {};
					if (!user || (role !== Role.ADMIN && role !== Role.USER && id !== parent.id))
						throw new Error("Not Allowed");
					return await prisma.exam
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.Profile();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const ExamsCount = objectType({
	name: "ExamsCount",
	definition(t) {
		t.int("_count");
	},
});

export const ExamsResponse = objectType({
	name: "ExamsResponse",
	definition(t) {
		t.list.field("list", {
			type: Exam,
		});
		t.string("prevCursor");
		t.nullable.string("nextCursor");
		t.nullable.field("totalCount", { type: ExamsCount });
	},
});

export const ExamCUResponse = objectType({
	name: "ExamCUResponse",
	definition(t) {
		t.int("count");
	},
});

//get all Exams
export const ExamsQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Exams", {
			type: "Exam",
			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					return await prisma.exam.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get unique Exam
export const ExamsByUserIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("SExams", {
			type: "ExamsResponse",
			args: {
				data: PaginationInputType,
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, args, { prisma, user }) => {
				try {
					const { studentId, data } = args;
					if (
						!user ||
						(user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId)
					)
						throw new Error("Not Allowed");
					let where = {};
					if (studentId) {
						where = {
							...where,
							Profile: { id: studentId },
						};
					}
					let result: studentExam[];
					let totalCount: { _count: number } | undefined | null;
					let nextCursor: string | undefined | null;
					let prevCursor: string | undefined | null;

					if (data) {
						result = await prisma.exam.findMany(queryArgs(data, where));

						nextCursor = result[result?.length - 1]?.id;
						prevCursor = result[0]?.id;

						if (!data?.myCursor) {
							totalCount = await prisma.exam.aggregate({
								where: {
									Profile: { id: studentId },
								},
								_count: true,
							});
						}
					} else {
						result = await prisma.exam.findMany({
							where: {
								Profile: { id: studentId },
							},
						});
					}

					return {
						list: result,
						prevCursor,
						nextCursor,
						totalCount,
					};
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get unique Exam
export const ExamByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("Exam", {
			type: "Exam",
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					return await prisma.exam.findUniqueOrThrow({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//create Exam
export const createExamMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createExam", {
			type: "Exam",
			args: {
				profileId: nonNull(stringArg()),
				score: nonNull(floatArg()),
				date: nonNull(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
			},
			resolve: async (_parent, { score, date, note, profileId }, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					const newExam = {
						score,
						date,
						note,
						createdBy: user.id,
						Profile: {
							connect: {
								id: profileId,
							},
						},
					};
					return await prisma.exam.create({
						data: newExam,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//create Multiple Attendance
export const createMultipleExamMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("createMultipleExam", {
			type: "ExamCUResponse",
			args: {
				score: nullable(floatArg()),
				date: nonNull(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
				profileIds: nullable(list(nonNull(stringArg()))),
				studentsAndScores: nullable(arg({ type: "JSONObject" })),
			},
			resolve: async (
				_parent,
				{ score, note, date, profileIds, studentsAndScores },
				{ prisma, user }
			) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");
					const newExams: Omit<exam, "id">[] = [];
					const isEmpty = Object.keys(studentsAndScores).length === 0;
					if (isEmpty) {
						profileIds?.forEach((id: string) =>
							newExams.push({
								score: score || 0.001,
								date,
								note,
								profileId: id,
								createdBy: user.id,
							})
						);
					} else {
						Object.entries(studentsAndScores).map(([key, value]) => {
							newExams.push({
								score: Number(value),
								date,
								note,
								profileId: key,
								createdBy: user.id,
							});
						});
					}

					return await prisma.exam.createMany({
						data: newExams,
						skipDuplicates: true,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Exam
export const UpdateExamMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateExam", {
			type: "Exam",
			args: {
				id: nonNull(stringArg()),
				score: floatArg(),
				date: arg({ type: "DateTime" }),
				note: stringArg(),
			},
			resolve: async (_parent, { id, score, date, note }, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					const updateExam = {
						score,
						date,
						note,
						updatedBy: user.id,
					};
					return await prisma.exam.update({
						where: { id },
						data: { ...updateExam },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Multiple Attendance
export const UpdateMultipleExamMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateMultipleExam", {
			type: "ExamCUResponse",
			args: {
				dateCondition: nonNull(arg({ type: "DateTime" })),
				noteCondition: arg({ type: "DateTime" }),
				scoreCondition: floatArg(),
				score: floatArg(),
				date: arg({ type: "DateTime" }),
				note: stringArg(),
				profileIds: nonNull(list(nonNull(stringArg()))),
			},
			resolve: async (
				_parent,
				{ dateCondition, scoreCondition, noteCondition, score, date, note, profileIds },
				{ prisma, user }
			) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					const ANDConditions = [];
					if (dateCondition) {
						ANDConditions.push({ date: dateCondition });
					}
					if (scoreCondition) {
						ANDConditions.push({ score: scoreCondition });
					}
					if (noteCondition) {
						ANDConditions.push({ note: { contains: noteCondition } });
					}
					const ORConditions: { profileId: string }[] = [];
					profileIds.forEach((id: string) => ORConditions.push({ profileId: id }));

					const updateExam = {
						date,
						score,
						note,
						updatedBy: user.id,
					};
					const where = {
						AND: ANDConditions,
						OR: ORConditions,
					};
					return await prisma.exam.updateMany({
						where,
						data: updateExam,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// delete Exam
export const DeleteExamMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteExam", {
			type: "Exam",
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, user }) {
				try {
					if (!user || user.role !== Role.ADMIN) throw new Error("Not Allowed");

					return await prisma.exam.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
