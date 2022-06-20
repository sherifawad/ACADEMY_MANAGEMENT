import { Contact, PrismaClient, User, UserPassword } from "@prisma/client";

export async function GetUserPassword(
	prisma: PrismaClient,
	user: User | Contact
): Promise<UserPassword | null> {
	return await prisma.userPassword.findUnique({
		where: {
			id: user.id,
		},
	});
}

export function ValidatePassword(password: UserPassword): boolean {
	return true;
}
