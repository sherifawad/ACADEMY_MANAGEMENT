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
import { RDP } from "./Role_Domain_Permission";

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
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.role
						.findUniqueOrThrow({
							where: { id },
						})
						.users();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.list.field("Role_Domain_Permission", {
			type: RDP,
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.role
						.findUniqueOrThrow({
							where: { id },
						})
						.rdps();
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
			type: UserRole,

			resolve: async (_parent, _args, { prisma, user }) => {
				try {
					const { role = null } = user;
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
			type: UserRole,
			args: {
				roleId: nonNull(intArg()),
			},
			resolve: async (_parent, { roleId }, { prisma, user }) => {
				try {
					const { role = null } = user;
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
			type: UserRole,
			args: {
				name: nonNull(stringArg()),
				description: nullable(stringArg()),
			},
			resolve: async (_parent, { name, description }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					const newRole: any = {
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
				domainPermissions: list(arg({ type: "JSONObject" })),
			},
			resolve: async (_parent, { roleId, name, description, domainPermissions }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					const isEmpty =
						!domainPermissions ||
						domainPermissions.length <= 0 ||
						Object.keys(domainPermissions[0]).length === 0;
					let domainPermissionsList: { domainId: number; permissionId: number }[] = [];
					if (isEmpty) {
						domainPermissionsList = [];
					} else {
						domainPermissions.forEach((obj) => {
							const objResult = (Object.entries(obj) as Array<[string, number[]]>).reduce<any>(
								(acc, [key, value]) => {
									if (!isNaN(Number(key)) && value instanceof Array<number>) {
										if (value.length > 0) {
											const newList = value.map((v) =>
												!isNaN(Number(v))
													? {
															domainId: Number(key),
															permissionId: Number(v),
													  }
													: []
											);
											return [...acc, ...newList];
										}
									}
									return acc;
								},
								[]
							);
							domainPermissionsList = [...domainPermissionsList, ...objResult];
						});
					}

					const rdps = isEmpty
						? undefined
						: {
								createMany: {
									skipDuplicates: true,
									data: domainPermissionsList,
								},
						  };

					const updateRole = {
						name,
						description,
						rdps,
					};

					const include = {
						rdps: isEmpty ? false : true,
					};
					if (domainPermissionsList && domainPermissionsList?.length >= 0) {
						await prisma.role_Domain_Permission.deleteMany({ where: { roleId } });
					}

					return await prisma.role.update({
						where: { id: roleId },
						data: updateRole,
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
					const { role = null } = user;
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
