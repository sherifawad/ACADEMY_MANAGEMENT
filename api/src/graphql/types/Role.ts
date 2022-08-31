import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, list } from "nexus";
import { Domain, Permission } from "@internal/prisma/client";

export const Role = objectType({
	name: "Role",
	definition(t) {
		t.int("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("users", {
			type: "User",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role
					.findUniqueOrThrow({
						where: { id },
					})
					.users();
			},
		});
		t.list.field("domains", {
			type: "Domain",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role
					.findUniqueOrThrow({
						where: { id },
					})
					.domains();
			},
		});
		t.list.field("permissions", {
			type: "Permission",
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role
					.findUniqueOrThrow({
						where: { id },
					})
					.permissions();
			},
		});
	},
});

export const RolesQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("roles", {
			type: "Role",

			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					return await prisma.role.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
export const RoleIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("role", {
			type: "Role",
			args: {
				roleId: nonNull(intArg()),
			},
			resolve: async (_parent, { roleId }, { prisma, user }) => {
				try {
					return await prisma.role.findUniqueOrThrow({
						where: { id: roleId },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const createRoleMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createRole", {
			type: "Role",
			args: {
				name: nonNull(stringArg()),
				description: nullable(stringArg()),
			},
			resolve: async (_parent, { name, description }, { prisma, user }) => {
				try {
					const newRole = {
						name,
						description,
					};
					return await prisma.role.create({
						data: newRole,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const UpdateRoleMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateRole", {
			type: "Role",
			args: {
				id: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
				domainsList: list(arg({ type: "Domain" })),
				permissionsList: list(arg({ type: "Permission" })),
			},
			resolve: async (
				_parent,
				{ id, name, description, domainsList, permissionsList },
				{ prisma, user }
			) => {
				try {
					const domains =
						domainsList?.length > 0
							? {
									connect: domainsList.map((domain: Domain) => ({
										id: domain.id,
									})),
							  }
							: undefined;
					const permissions =
						permissionsList?.length > 0
							? {
									connect: permissionsList.map((permission: Permission) => ({
										id: permission.id,
									})),
							  }
							: undefined;

					const updateRole = {
						name,
						description,
					};

					const include = {
						domains: domainsList?.length > 0 ? true : false,
						permissions: permissionsList?.length > 0 ? false : true,
					};
					return await prisma.role.update({
						where: { id },
						data: { ...updateRole },
						include,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const DeleteRoleMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteRole", {
			type: "Role",
			args: {
				roleId: nonNull(intArg()),
			},
			async resolve(_parent, { roleId }, { prisma, user }) {
				try {
					return await prisma.role.delete({
						where: { id: roleId },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
