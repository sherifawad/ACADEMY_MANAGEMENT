import { User, UserPassword } from "@prisma/client";

import { Context } from "../types";

export async function GetUserPassword(ctx: Context, user: User): Promise<UserPassword | null> {
	return await ctx.prisma.userPassword.findUnique({
		where: {
			id: user.id,
		},
	});
}

export function ValidatePassword(password: UserPassword): boolean {
	return true;
}
