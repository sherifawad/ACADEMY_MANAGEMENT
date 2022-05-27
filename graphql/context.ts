import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Context, UserToken } from "./types";
import { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";
import { assert } from "./utils/assert";
import { AuthenticationError } from "apollo-server-micro";
import { User } from "@prisma/client";
import { getSession } from "next-auth/react";
import { IncomingMessage, ServerResponse } from "http";
import { MicroRequest } from "apollo-server-micro/dist/types";

export async function createContext({
	req,
	res,
}: {
	req: NextApiRequest | MicroRequest;
	res: ServerResponse | NextApiResponse;
}): Promise<Context> {
	const { JWT_SECRET } = process.env;
	let user: User | null;

	try {
		const authorization = req?.headers?.authorization || "";
		if (authorization.length > 0) {
			assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
			const tokenString = authorization.replace("Bearer ", "");
			let token: UserToken | null;

			token = verify(tokenString, JWT_SECRET) as UserToken;
			if (token) {
				user = await prisma.user.findUnique({
					where: { id: token.userId },
				});

				// prisma.$use(async (params, next) => {
				// 	const before = Date.now();

				// 	const result = await next(params);

				// 	const after = Date.now();

				// 	console.log(`Query: ${params.model}.${params.action} userId ${token.userId}`);

				// 	return result;
				// });
			}
		}
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			throw new AuthenticationError("Token is expired");
		} else if (error instanceof JsonWebTokenError) {
			throw new AuthenticationError("Error parsing token");
		} else if (error instanceof NotBeforeError) {
			throw new AuthenticationError("Token not yet valid");
		} else {
			console.log("🚀 ~ file: context.ts ~ line 34 ~ error", error);
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
