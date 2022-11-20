import { extendType, nonNull, objectType, stringArg } from "nexus";
import { User } from "./User";

export const Family = objectType({
	name: "Family",
	definition(t) {
		t.nonNull.string("id");
		t.string("familyName");
		t.string("createdBy");
		t.string("updatedBy");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("users", {
			type: User,
			async resolve({ id }, _args, { session, prisma }) {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					const output = await prisma.family
						.findUniqueOrThrow({
							where: {
								id,
							},
						})
						.users();
					return output;
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//get unique Family
export const FamilyByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("family", {
			type: Family,
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");

					const output = await prisma.family.findUniqueOrThrow({
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

//create Family
export const createFamilyMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createFamily", {
			type: Family,
			args: {
				familyName: nonNull(stringArg()),
			},
			resolve: async (_parent, { familyName }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					const newFamily = {
						familyName,
						createdBy: session.user.id,
					};

					return await prisma.family.create({
						data: newFamily,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Family
export const UpdateFamilyMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateFamily", {
			type: Family,
			args: {
				id: nonNull(stringArg()),
				familyName: nonNull(stringArg()),
			},
			resolve: async (_parent, { id, familyName }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					const updateFamily = {
						familyName,
						updatedBy: session.user.id,
					};
					return await prisma.family.update({
						where: { id },
						data: { ...updateFamily },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// delete Family
export const DeleteFamilyMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteFamily", {
			type: Family,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					const { role = null } = session || {};
					// if (!role) throw new Error("Not Allowed");
					return await prisma.family.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
