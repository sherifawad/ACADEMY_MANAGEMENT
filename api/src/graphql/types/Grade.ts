import { Role } from "@internal/prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, booleanArg } from "nexus";
import { Group } from "./Group";
import { Profile } from "./Profile";

//generates Grade type at schema.graphql
export const Grade = objectType({
	name: "Grade",
	definition(t) {
		t.nonNull.string("id");
		t.boolean("isActive");
		t.string("name");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("groups", {
			type: Group,
			async resolve(_parent, _args, { user, prisma }) {
				try {
					const { role } = user || {};
					if (!user || (role !== Role.ADMIN && role !== Role.USER)) throw new Error("Not Allowed");
					return await prisma.grade
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.groups();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.list.field("profiles", {
			type: Profile,
			async resolve({ id }, _args, ctx) {
				try {
					return await ctx.prisma.grade
						.findUniqueOrThrow({
							where: {
								id,
							},
						})
						.profiles();
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;
					return await prisma.Grade.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get all Grades
export const ActiveGradesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("ActiveGrades", {
			type: "Grade",
			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;
					return await prisma.Grade.findMany({
						where: { isActive: true },
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER)) return null;

					return await prisma.Grade.findUniqueOrThrow({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				isActive: nonNull(booleanArg()),
			},
			resolve: async (_parent, { name, isActive }, { prisma, user }) => {
				try {
					if (!user || user.role !== Role.ADMIN) return null;

					const newGrade = {
						name,
						isActive,
						createdBy: user.id,
					};
					return await prisma.Grade.create({
						data: newGrade,
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				name: nonNull(stringArg()),
				isActive: nonNull(booleanArg()),
			},
			resolve: async (_parent, { id, name, isActive }, { prisma, user }) => {
				try {
					if (!user || user.role !== Role.ADMIN) return null;

					const updateGrade = {
						name,
						isActive,
						updatedBy: user.id,
					};
					return await prisma.Grade.update({
						where: { id },
						data: { ...updateGrade },
					});
				} catch (error) {
					return Promise.reject("error");
				}
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
				try {
					if (!user || user.role !== Role.ADMIN) return null;

					return prisma.Grade.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
