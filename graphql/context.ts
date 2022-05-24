import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Context, UserToken } from "./types";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";
import { assert } from "./utils/assert";
import { AuthenticationError } from "apollo-server-micro";
import { User } from "@prisma/client";

export async function createContext(req: NextApiRequest, res: NextApiResponse): Promise<Context> {
	const { JWT_SECRET } = process.env;
	let user: User | null;
	try {
		let tokenString = String(req.headers["x-access-token"] || req.headers.authorization || "");
		console.log("🚀 ~ file: context.ts ~ line 14 ~ createContext ~ tokenString", tokenString);
		assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
		if (tokenString && tokenString.startsWith("Bearer")) tokenString = tokenString.slice(7);
		if (tokenString && tokenString.startsWith("token")) tokenString = tokenString.slice(6);
		const token = verify(tokenString, JWT_SECRET) as unknown as UserToken;
		user = await prisma.user.findUnique({
			where: { id: token.userId },
		});
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
