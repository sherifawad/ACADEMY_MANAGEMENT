import {
	nonNull,
	objectType,
	stringArg,
	extendType,
	intArg,
	nullable,
	arg,
	list,
	extendInputType,
	inputObjectType,
} from "nexus";
import { AppDomain } from "./AppDomain";
import { User } from "./User";
import { UserPermission } from "./UserPermission";
import { Domain, Permission } from "@internal/prisma/client";

export const UserRole = objectType({
	name: "UserRole",
	definition(t) {
		t.int("id");
		t.string("name");
		t.string("description");
		t.field("createdAt", { type: "DateTime" });
		t.field("updatedAt", { type: "DateTime" });
		t.list.field("users", {
			type: User,
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role
					.findUniqueOrThrow({
						where: { id },
					})
					.users();
			},
		});
		t.list.field("domains", {
			type: AppDomain,
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role
					.findUniqueOrThrow({
						where: { id },
					})
					.domains();
			},
		});
		t.list.field("permissions", {
			type: UserPermission,
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
			type: UserRole,

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
			type: UserRole,
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
			type: UserRole,
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
			type: UserRole,
			args: {
				roleId: nonNull(intArg()),
				name: stringArg(),
				description: stringArg(),
				domainsIdsList: list(intArg()),
				permissionsIdsList: list(intArg()),
			},
			resolve: async (
				_parent,
				{ roleId, name, description, domainsIdsList, permissionsIdsList },
				{ prisma, user }
			) => {
				try {
					const domains =
						domainsIdsList && domainsIdsList?.length > 0
							? {
									connect: domainsIdsList.map((id: any) => ({
										id,
									})),
							  }
							: undefined;
					const permissions =
						permissionsIdsList && permissionsIdsList?.length > 0
							? {
									connect: permissionsIdsList.map((id: any) => ({
										id,
									})),
							  }
							: undefined;

					const updateRole = {
						name,
						description,
						domains,
						permissions,
					};

					const include = {
						domains: domainsIdsList && domainsIdsList?.length > 0 ? true : false,
						permissions: permissionsIdsList && permissionsIdsList?.length > 0 ? false : true,
					};
					return await prisma.role.update({
						where: { id: roleId },
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
			type: UserRole,
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
