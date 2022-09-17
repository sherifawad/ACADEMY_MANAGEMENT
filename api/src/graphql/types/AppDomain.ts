import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core, list } from "nexus";
import { Role } from "@internal/prisma/client";
import { UserRole } from "./UserRole";

export const AppDomain = objectType({
	name: "AppDomain",
	definition(t) {
		t.int("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("roles", {
			type: UserRole,
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.domain
						.findUniqueOrThrow({
							where: { id },
						})
						.roles();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const DomainsQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("domains", {
			type: AppDomain,

			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.domain.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const DomainIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("domain", {
			type: AppDomain,
			args: {
				domainId: nonNull(intArg()),
			},
			resolve: async (_parent, { domainId }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.domain.findUniqueOrThrow({
						where: { id: domainId },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const createDomainMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createDomain", {
			type: AppDomain,
			args: {
				name: nonNull(stringArg()),
				description: nullable(stringArg()),
			},
			resolve: async (_parent, { name, description }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					const newDomain: any = {
						name,
						description,
					};
					return await prisma.domain.create({
						data: newDomain,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const UpdateDomainMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateDomain", {
			type: AppDomain,
			args: {
				domainId: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
			},
			resolve: async (_parent, { domainId, name, description }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					const updateDomain = {
						name,
						description,
					};

					return await prisma.domain.update({
						where: { id: domainId },
						data: { ...updateDomain },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const DeleteDomainMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteDomain", {
			type: AppDomain,
			args: {
				domainId: nonNull(intArg()),
			},
			async resolve(_parent, { domainId }, { prisma, user }) {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.domain.delete({
						where: { id: domainId },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
