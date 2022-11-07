import { arg, extendType, floatArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { Exam as examType } from "@internal/prisma/client";
import { Profile } from "./Profile";
import { Count, PaginationInputType, queryArgs } from ".";

//generates Exam type at schema.graphql
export const Exam = objectType({
	name: "Exam",
	definition(t) {
		t.id("id");
		t.string("profileId");
		t.string("note");
		t.float("score");
		t.string("createdBy");
		t.string("updatedBy");
		t.date("createdAt");
		t.date("updatedAt");
		t.date("date");
		t.field("profile", {
			type: Profile,
			resolve: async (parent, _, { session, prisma }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.exam
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.Profile();
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
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
		t.nullable.field("totalCount", { type: Count });
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
			type: Exam,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.exam.findMany();
					return output;
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
		t.field("StudentExams", {
			type: ExamsResponse,
			args: {
				data: PaginationInputType,
				studentId: nonNull(stringArg()),
			},
			resolve: async (_parent, args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const { studentId, data } = args;

					let where = {};
					if (studentId) {
						where = {
							...where,
							Profile: { id: studentId },
						};
					}
					let result: examType[];
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

					const output = {
						list: result,
						prevCursor,
						nextCursor,
						totalCount,
					};
					return output;
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
			type: Exam,
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const output = await prisma.exam.findUniqueOrThrow({
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

//create Exam
export const createExamMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createExam", {
			type: Exam,
			args: {
				profileId: nonNull(stringArg()),
				score: nonNull(floatArg()),
				date: nonNull(arg({ type: "DateTime" })),
				note: nullable(stringArg()),
			},
			resolve: async (_parent, { score, date, note, profileId }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newExam = {
						score,
						date,
						note,
						createdBy: session.user.id,
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
			type: ExamCUResponse,
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
				{ prisma, session }
			) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newExams: Omit<examType, "id" | "createdAt" | "updatedAt" | "updatedBy">[] = [];
					const isEmpty = Object.keys(studentsAndScores).length === 0;
					if (isEmpty) {
						profileIds?.forEach((id: string) =>
							newExams.push({
								score: score || 0.001,
								date,
								note: note ?? null,
								profileId: id,
								createdBy: session.user.id,
							})
						);
					} else {
						Object.entries(studentsAndScores).map(([key, value]) => {
							newExams.push({
								score: Number(value),
								date,
								note: note ?? null,
								profileId: key,
								createdBy: session.user.id,
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
			type: Exam,
			args: {
				id: nonNull(stringArg()),
				score: floatArg(),
				date: arg({ type: "DateTime" }),
				note: stringArg(),
			},
			resolve: async (_parent, { id, score, date, note }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const updateExam = {
						score,
						date,
						note,
						updatedBy: session.user.id,
					} as any;

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
			type: ExamCUResponse,
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
				{ prisma, session }
			) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
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
						updatedBy: session.user.id,
					} as any;
					const where: any = {
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
			type: Exam,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
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
