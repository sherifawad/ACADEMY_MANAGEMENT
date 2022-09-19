import { nonNull, objectType, stringArg, extendType, intArg, nullable, booleanArg } from "nexus";
import { DomainsIds } from ".";
import { getDomainPermissions } from "../../utils/utils";
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
			async resolve({ id }, _args, { user, prisma }) {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");
					const output = await prisma.family
						.findUniqueOrThrow({
							where: {
								id,
							},
						})
						.users();

					if (permissionsList.includes("readFamily")) {
						if (id === user.familyId) {
							return output;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return output;
					}
					throw new Error("Not Allowed");
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
					const { role = null, familyId = -1 } = user || {};
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");

					const output = await prisma.family.findUniqueOrThrow({
						where: { id },
					});

					if (permissionsList.includes("readFamily")) {
						if (familyId && familyId === user.familyId) {
							return output;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return output;
					}
					throw new Error("Not Allowed");
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
					const { role = null } = user || {};
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");
					const newFamily = {
						familyName,
						createdBy: user.id,
					};

					if (permissionsList.includes("full") || permissionsList.includes("create")) {
						return await prisma.family.create({
							data: newFamily,
						});
					}
					throw new Error("Not Allowed");
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
					const { role = null } = user || {};
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");
					const updateFamily = {
						familyName,
						updatedBy: user.id,
					};

					if (permissionsList.includes("editSelf")) {
						if (id !== user.familyId) {
							return await prisma.family.update({
								where: { id },
								data: { ...updateFamily },
							});
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("edit")) {
						return await prisma.family.update({
							where: { id },
							data: { ...updateFamily },
						});
					}
					throw new Error("Not Allowed");
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
			async resolve(_parent, { id }, { prisma, user }) {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");
					if (!permissionsList.includes("full") && !permissionsList.includes("delete")) {
						throw new Error("Not Allowed");
					}
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
