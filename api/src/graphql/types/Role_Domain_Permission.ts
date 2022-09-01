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
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role_Domain_Permission
					.findUniqueOrThrow({
						where: { id },
					})
					.domain();
			},
		});
		t.field("role", {
			type: UserRole,
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role_Domain_Permission
					.findUniqueOrThrow({
						where: { id },
					})
					.role();
			},
		});
		t.field("permission", {
			type: UserPermission,
			resolve: async ({ id }, _, { prisma }) => {
				return await prisma.role_Domain_Permission
					.findUniqueOrThrow({
						where: { id },
					})
					.permission();
			},
		});
	},
});
