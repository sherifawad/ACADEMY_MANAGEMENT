import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, core, list } from "nexus";
import { Role } from "@internal/prisma/client";

//generates Exam type at schema.graphql
export const Permission = objectType({
	name: "Permission",
	definition(t) {
		t.int("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.field("roles", {
			type: "Role",
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
			type: "Permission",

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
			type: "Permission",
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
			type: "Permission",
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
			type: "Permission",
			args: {
				permissionId: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
				rolesList: list(arg({ type: "Role" })),
			},
			resolve: async (_parent, { permissionId, name, description, rolesList }, { prisma, user }) => {
				try {
					const roles =
						rolesList?.length > 0
							? {
									connect: rolesList.map((role: Role) => ({
										id: role.id,
									})),
							  }
							: undefined;

					const updatePermission = {
						name,
						description,
					};

					const include = {
						roles: rolesList?.length > 0 ? true : false,
					};
					return await prisma.permission.update({
						where: { id: permissionId },
						data: { ...updatePermission },
						include,
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
			type: "Permission",
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
