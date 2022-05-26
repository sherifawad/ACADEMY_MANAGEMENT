import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Context, UserToken } from "./types";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";
import { assert } from "./utils/assert";
import { AuthenticationError } from "apollo-server-micro";
import { User } from "@prisma/client";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";

export async function createContext(
	req: NextApiRequest | MicroRequest,
	res: NextApiResponse | ServerResponse
): Promise<Context> {
	const { JWT_SECRET } = process.env;
	let user: User | null;
	let token: UserToken | null;

	try {
		const authorization = req.headers.authorization ?? "";
		// let tokenString =
		// 	String(req.headers["x-access-token"]).split(";")[0] ||
		// 	String(req.headers.authorization).split(";")[0] ||
		// 	"";
		// assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
		// if (tokenString && tokenString.startsWith("Bearer")) tokenString = tokenString.slice(7);
		// if (tokenString && tokenString.startsWith("token")) tokenString = tokenString.slice(6);

		if (authorization.length > 0) {
			console.log("🚀 ~ file: context.ts ~ line 13 ~ createContext ~ authorization", authorization);

			assert(JWT_SECRET, "Missing JWT_SECRET environment variable");

			const tokenString = authorization.replace("Bearer ", "");
			console.log("🚀 ~ file: context.ts ~ line 14 ~ createContext ~ tokenString", tokenString);
			const token = verify(tokenString, JWT_SECRET) as unknown as UserToken;
			console.log("🚀 ~ file: context.ts ~ line 19 ~ createContext ~ token", token);
			user = await prisma.user.findUnique({
				where: { id: token.userId },
			});
			console.log("🚀 ~ file: context.ts ~ line 23 ~ createContext ~ user", user);
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
