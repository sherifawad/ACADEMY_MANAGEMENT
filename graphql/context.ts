import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Context, UserToken } from "./types";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";
import { assert } from "./utils/assert";
import { AuthenticationError } from "apollo-server-micro";
import { User } from "@prisma/client";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";

export async function createContext(
	{ req }: { req: NextApiRequest },
	res: NextApiResponse
): Promise<Context> {
	console.log("🚀 ~ file: context.ts ~ line 15 ~ res", res);
	const { JWT_SECRET } = process.env;
	let user: User | null;
	let token: UserToken | null;

	try {
		let tokenString = req?.headers?.authorization?.split(";")[0] || "";
		if (tokenString.length > 0) {
			assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
			if (tokenString && tokenString.startsWith("Bearer")) tokenString = tokenString.slice(7);
			if (tokenString && tokenString.startsWith("token")) tokenString = tokenString.slice(6);
			// const tokenString = authorization.replace("Bearer ", "");
			const token = verify(tokenString, JWT_SECRET) as unknown as UserToken;
			console.log("🚀 ~ file: context.ts ~ line 19 ~ createContext ~ token", token);
			user = await prisma.user.findUnique({
				where: { id: token.userId },
			});
		}
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			throw new AuthenticationError("Token is expired");
		} else if (error instanceof JsonWebTokenError) {
			throw new AuthenticationError("Error parsing token");
		} else if (error instanceof NotBeforeError) {
			throw new AuthenticationError("Token not yet valid");
		} else {
		}
		user = null;
	}

	return {
		req,
		res,
		prisma,
		user,
	};
}
