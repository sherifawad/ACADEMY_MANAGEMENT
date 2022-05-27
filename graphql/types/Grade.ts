import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable } from "nexus";
import { Group } from "./Group";
import { Profile } from "./Profile";

//generates Grade type at schema.graphql
export const Grade = objectType({
	name: "Grade",
	definition(t) {
		t.nonNull.string("id");
		t.string("name");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("groups", {
			type: Group,
			async resolve(_parent, _args, ctx) {
				return await ctx.prisma.grade
					.findUnique({
						where: {
							id: _parent.id,
						},
					})
					.groups();
			},
		});
		t.list.field("profiles", {
			type: Profile,
			async resolve({ id }, _args, ctx) {
				return await ctx.prisma.grade
					.findUnique({
						where: {
							id,
						},
					})
					.profiles();
			},
		});
	},
});

//get all Grades
export const GradesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Grades", {
			type: "Grade",
			resolve: async (_parent, _args, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;
				return await prisma.Grade.findMany();
			},
		});
	},
});

//get unique Grade
export const GradeByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("Grade", {
			type: "Grade",
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, user }) => {
				if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

				return await prisma.Grade.findUnique({
					where: { id },
				});
			},
		});
	},
});

//create Grade
export const createGradeMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createGrade", {
			type: "Grade",
			args: {
				name: nonNull(stringArg()),
				email: nullable(stringArg()),
				image: nullable(stringArg()),
			},
			resolve: async (_parent, { name, image, email }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const newGrade = {
					name,
					image,
					email,
				};
				return await prisma.Grade.create({
					data: newGrade,
				});
			},
		});
	},
});

// update Grade
export const UpdateGradeMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateGrade", {
			type: "Grade",
			args: {
				id: nonNull(stringArg()),
				name: stringArg(),
				email: stringArg(),
				image: stringArg(),
			},
			resolve: async (_parent, { id, name, image, email }, { prisma, user }) => {
				if (!user || user.role !== Role.ADMIN) return null;

				const updateGrade = {
					name,
					image,
					email,
				};
				return await prisma.Grade.update({
					where: { id },
					data: { ...updateGrade },
				});
			},
		});
	},
});

// delete Grade
export const DeleteGradeMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteGrade", {
			type: "Grade",
			args: {
				id: nonNull(stringArg()),
			},
			resolve(_parent, { id }, { prisma, user }) {
				if (!user || user.role !== Role.ADMIN) return null;

				return prisma.Grade.delete({
					where: { id },
				});
			},
		});
	},
});
