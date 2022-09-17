import { objectType } from "nexus";
import { AppDomain } from "./AppDomain";
import { UserPermission } from "./UserPermission";
import { UserRole } from "./UserRole";

export const RDP = objectType({
	name: "Role_Domain_Permission",
	definition(t) {
		t.int("id");
		t.field("domain", {
			type: AppDomain,
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.role_Domain_Permission
						.findUniqueOrThrow({
							where: { id },
						})
						.domain();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("role", {
			type: UserRole,
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.role_Domain_Permission
						.findUniqueOrThrow({
							where: { id },
						})
						.role();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
		t.field("permission", {
			type: UserPermission,
			resolve: async ({ id }, _, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role || role.id !== 1) throw new Error("Not Allowed");
					return await prisma.role_Domain_Permission
						.findUniqueOrThrow({
							where: { id },
						})
						.permission();
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
