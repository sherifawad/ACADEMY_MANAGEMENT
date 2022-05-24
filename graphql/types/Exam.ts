import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable } from "nexus";

//generates Exam type at schema.graphql
export const Exam = objectType({
	name: "Exam",
	definition(t) {
		t.string("id");
		t.string("note");
		t.float("score");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.field("profile", {
			type: "Profile",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.exam
					.findUnique({
						where: { id },
					})
					.profile();
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
				if (!user || user.role !== Role.USER || user.role !== Role.ADMIN) return null;
				await prisma.Exam.findMany();
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
				if (!user || user.role !== Role.USER || user.role !== Role.ADMIN) return null;

				await prisma.Exam.findUnique({
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
				name: nonNull(stringArg()),
				email: nullable(stringArg()),
				image: nullable(stringArg()),
			},
			resolve: async (_parent, { name, image, email }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const newExam = {
					name,
					image,
					email,
				};
				return await prisma.Exam.create({
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
				id: stringArg(),
				name: stringArg(),
				email: stringArg(),
				image: stringArg(),
			},
			resolve: async (_parent, { id, name, image, email }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const updateExam = {
					name,
					image,
					email,
				};
				return await prisma.Exam.update({
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
			resolve(_parent, { id }, { prisma, user }) {
				if (!user || user.role !== Role.ADMIN) return null;

				return prisma.Exam.delete({
					where: { id },
				});
			},
		});
	},
});
