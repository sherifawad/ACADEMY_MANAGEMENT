import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, booleanArg } from "nexus";
import { User } from "./User";

//generates Family type at schema.graphql
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
			async resolve(_parent, _args, { user, prisma }) {
				try {
					const { role, id } = user || {};
					if (!user || (role !== Role.ADMIN && role !== Role.USER && _parent.id !== id))
						throw new Error("Not Allowed");
					return await prisma.family
						.findUniqueOrThrow({
							where: {
								id: _parent.id,
							},
						})
						.users();
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
			type: "Family",
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, user }) => {
				try {
					const { familyId } = user || {};
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER && familyId !== id))
						return null;

					return await prisma.family.findUniqueOrThrow({
						where: { id },
					});
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
			type: "Family",
			args: {
				familyName: nonNull(stringArg()),
			},
			resolve: async (_parent, { familyName }, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					const newFamily = {
						familyName,
						createdBy: user.id,
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
			type: "Family",
			args: {
				id: nonNull(stringArg()),
				familyName: nonNull(stringArg()),
			},
			resolve: async (_parent, { id, familyName }, { prisma, user }) => {
				try {
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");

					const updateFamily = {
						familyName,
						updatedBy: user.id,
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
			type: "Family",
			args: {
				id: nonNull(stringArg()),
			},
			resolve(_parent, { id }, { prisma, user }) {
				try {
					if (!user || user.role !== Role.ADMIN) throw new Error("Not Allowed");

					return prisma.family.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
