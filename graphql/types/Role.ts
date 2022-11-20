import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { User } from "./User";
import { Role as roleType } from "@prisma/client";

export const Role = objectType({
	name: "Role",
	definition(t) {
		t.id("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("users", {
			type: User,
			resolve: async (parent, _, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.role
						.findUniqueOrThrow({
							where: { id: parent.id },
						})
						.users();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

export const RolesQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("roles", {
			type: Role,
			resolve: async (_parent, _args, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					if (!role || role.id !== 1) throw new Error("Not Allowed");

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
		t.field("role", {
			type: Role,
			args: {
				roleId: nonNull(intArg()),
			},
			resolve: async (_parent, { roleId }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					if (!role || role.id !== 1) throw new Error("Not Allowed");
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
			type: Role,
			args: {
				name: nonNull(stringArg()),
				description: nullable(stringArg()),
			},
			resolve: async (_parent, { name, description }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					const newRole: Omit<roleType, "id" | "createdAt" | "updatedAt" | "updatedBy"> = {
						name,
						description: description ?? null,
						createdBy: session.user.id,
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
			type: Role,
			args: {
				roleId: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
			},
			resolve: async (_parent, { roleId, name, description }, { prisma, session }) => {
				try {
					const { role = null } = session || {};
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					const originalData = await prisma.role.findUniqueOrThrow({ where: { id: roleId } });
					if (!originalData) throw new Error("Not Exist");

					const updateRole = {
						name: name ?? originalData.name,
						description,
						updatedBy: session.user.id,
					};

					return await prisma.role.update({
						where: { id: roleId },
						data: updateRole,
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
			type: Role,
			args: {
				roleId: nonNull(intArg()),
			},
			async resolve(_parent, { roleId }, { prisma, session }) {
				try {
					const { role = null } = session || {};
					if (!role || role.id !== 1) throw new Error("Not Allowed");
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
