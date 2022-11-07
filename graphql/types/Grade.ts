import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";
import { Group } from "./Group";

export const Grade = objectType({
	name: "Grade",
	definition(t) {
		t.nonNull.string("id");
		t.boolean("isActive");
		t.string("name");
		t.string("createdBy");
		t.string("updatedBy");
		t.date("createdAt");
		t.date("updatedAt");
		t.list.field("groups", {
			type: Group,
			async resolve(_parent, _args, { session, prisma }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
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
	},
});

//get all Grades
export const GradesQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.list.field("Grades", {
			type: Grade,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.grade.findMany();
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
			type: Grade,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.grade.findMany({
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
			type: Grade,
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.grade.findUniqueOrThrow({
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
			type: Grade,
			args: {
				name: nonNull(stringArg()),
				isActive: nonNull(booleanArg()),
			},
			resolve: async (_parent, { name, isActive }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newGrade = {
						name,
						isActive,
						createdBy: session.user.id,
					};
					return await prisma.grade.create({
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
			type: Grade,
			args: {
				id: nonNull(stringArg()),
				name: nonNull(stringArg()),
				isActive: nonNull(booleanArg()),
			},
			resolve: async (_parent, { id, name, isActive }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const updateGrade = {
						name,
						isActive,
						updatedBy: session.user.id,
					};
					return await prisma.grade.update({
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
			type: Grade,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					return await prisma.grade.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
