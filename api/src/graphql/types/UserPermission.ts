import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core, list } from "nexus";
// import { UserRole } from "./UserRole";
import { Role } from "@internal/prisma/client";
import { UserRole } from "./UserRole";

//generates Exam type at schema.graphql
export const UserPermission = objectType({
	name: "UserPermission",
	definition(t) {
		t.int("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("roles", {
			type: UserRole,
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.permission
					.findUniqueOrThrow({
						where: { id },
					})
					.roles();
			},
		});
	},
});
export const PermissionsQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("permissions", {
			type: UserPermission,
			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					return await prisma.permission.findMany();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const PermissionIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("permission", {
			type: UserPermission,
			args: {
				permissionId: nonNull(intArg()),
			},
			resolve: async (_parent, { permissionId }, { prisma, user }) => {
				try {
					return await prisma.permission.findUniqueOrThrow({
						where: { id: permissionId },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const createPermissionMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createPermission", {
			type: UserPermission,
			args: {
				name: nonNull(stringArg()),
				description: nullable(stringArg()),
			},
			resolve: async (_parent, { name, description }, { prisma, user }) => {
				try {
					const newPermission = {
						name,
						description,
					};
					return await prisma.permission.create({
						data: newPermission,
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const UpdatePermissionMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updatePermission", {
			type: UserPermission,
			args: {
				permissionId: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
			},
			resolve: async (_parent, { permissionId, name, description }, { prisma, user }) => {
				try {
					const updatePermission = {
						name,
						description,
					};

					return await prisma.permission.update({
						where: { id: permissionId },
						data: { ...updatePermission },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const DeletePermissionMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deletePermission", {
			type: UserPermission,
			args: {
				permissionId: nonNull(intArg()),
			},
			async resolve(_parent, { permissionId }, { prisma, user }) {
				try {
					return await prisma.permission.delete({
						where: { id: permissionId },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
