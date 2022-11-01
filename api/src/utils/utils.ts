import prisma from "../lib/prisma";

export const isNullish = (obj: any) =>
	Object.values(obj).every((value) => {
		if (value !== null) {
			return false;
		}

		return true;
	});
export const removeNullObjects = (obj: any) => {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (value === null) {
			return acc;
		}
		if (typeof value === "string" && value.trim() === "") {
			return { ...acc, [key]: undefined };
		}
		return { ...acc, [key]: value };
	}, {});
};

export const getDomainPermissions = async (roleId: number, domainId: number) => {
	try {
		if (roleId === 1) {
			return ["full"];
		}
		const roleAttendancePermissions = await prisma.role_Domain_Permission.findMany({
			where: {
				AND: [{ domainId: domainId }, { roleId: roleId }],
			},
		});
		if (!roleAttendancePermissions == roleAttendancePermissions.length <= 0) return null;

		return roleAttendancePermissions.map((permission) => {
			switch (permission.permissionId) {
				case 1:
					return "full";
				case 2:
					return "delete";
				case 3:
					return "deleteSelf";
				case 4:
					return "edit";
				case 5:
					return "editSelf";
				case 6:
					return "create";
				case 7:
					return "deActivateSelf";
				case 8:
					return "deActivate";
				case 9:
					return "read";
				case 10:
					return "readSelf";
				case 11:
					return "readFamily";
				default:
					break;
			}
		});
	} catch (error) {
		return null;
	}
};
