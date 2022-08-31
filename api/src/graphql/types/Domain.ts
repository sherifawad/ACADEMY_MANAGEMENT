import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core, list } from "nexus";
import { Role } from "@internal/prisma/client";

export const Domain = objectType({
	name: "Domain",
	definition(t) {
		t.int("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("roles", {
			type: "Role",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.domain
					.findUniqueOrThrow({
						where: { id },
					})
					.roles();
			},
		});
	},
});

export const DomainsQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("domains", {
			type: "Domain",

			resolve: async (_parent, _args, { prisma, user }) => {
				try {
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
			type: "Domain",
			args: {
				domainId: nonNull(intArg()),
			},
			resolve: async (_parent, { domainId }, { prisma, user }) => {
				try {
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
			type: "Domain",
			args: {
				name: nonNull(stringArg()),
				description: nullable(stringArg()),
			},
			resolve: async (_parent, { name, description }, { prisma, user }) => {
				try {
					const newDomain = {
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
			type: "Domain",
			args: {
				domainId: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
				rolesList: list(arg({ type: "Role" })),
			},
			resolve: async (_parent, { domainId, name, description, rolesList }, { prisma, user }) => {
				try {
					const roles =
						rolesList?.length > 0
							? {
									connect: rolesList.map((role: Role) => ({
										id: role.id,
									})),
							  }
							: undefined;

					const updateDomain = {
						name,
						description,
					};

					const include = {
						roles: rolesList?.length > 0 ? true : false,
					};
					return await prisma.domain.update({
						where: { id: domainId },
						data: { ...updateDomain },
						include,
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
			type: "Domain",
			args: {
				domainId: nonNull(intArg()),
			},
			async resolve(_parent, { domainId }, { prisma, user }) {
				try {
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
