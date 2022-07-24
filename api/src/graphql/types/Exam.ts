import { Exam as studentExam, Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, floatArg } from "nexus";
import { PaginationInputType, queryArgs } from "./User";

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
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.exam
					.findUnique({
						where: { id },
					})
					.Profile();
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
		t.nullable.string("nextCursor");
		t.nullable.field("totalCount", { type: ExamsCount });
	},
});

//get all Exams
export const ExamsQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Exams", {
			type: "Exam",
			resolve: async (_parent, _args, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.exam.findMany();
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
				const { studentId, data } = args;
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId))
					return null;
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

				if (data) {
					result = await prisma.exam.findMany(queryArgs(data, where));

					nextCursor = result[result?.length - 1]?.id;

					if (!data?.myCursor) {
						totalCount = await prisma.exam.aggregate({
							where: {
								Profile: { id: studentId },
							},
							_count: true,
						});
					}
				} else {
					result = await prisma.exam.findMany();
				}

				return {
					list: result,
					nextCursor,
					totalCount,
				};
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
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.exam.findUnique({
					where: { id },
				});
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
				if (!user || user.role !== Role.ADMIN) return null;

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
				score: stringArg(),
				date: arg({ type: "DateTime" }),
				note: stringArg(),
			},
			resolve: async (_parent, { id, score, date, note }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

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
				if (!user || user.role !== Role.ADMIN) return null;

				return await prisma.exam.delete({
					where: { id },
				});
			},
		});
	},
});
