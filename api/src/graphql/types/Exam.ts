import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, floatArg } from "nexus";

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
		t.nonNull.list.field("UserExams", {
			type: "Exam",
			args: { studentId: nonNull(stringArg()) },
			resolve: async (_parent, { studentId }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && user.id !== studentId))
					return null;

				return await prisma.exam.findMany({
					where: {
						Profile: { id: studentId },
					},
				});
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
				console.log("🚀 ~ file: Exam.ts ~ line 100 ~ resolve: ~ newExam", newExam);
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
