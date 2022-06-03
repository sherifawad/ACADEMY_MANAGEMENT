import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Context, nextAuthToken, UserToken } from "./types";
import { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";
import { assert } from "./utils/assert";
import { AuthenticationError } from "apollo-server-micro";
import { User } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { decodeToken } from "core/jwt";
import { getToken } from "next-auth/jwt";

export async function createContext({
	req,
	res,
}: {
	req: NextApiRequest;
	res: ServerResponse | NextApiResponse;
}): Promise<Context> {
	const { JWT_SECRET } = process.env;
	let user: User | null;

	try {
		const authorization = req?.headers?.authorization || "";
		if (authorization.length > 0) {
			assert(JWT_SECRET, "Missing JWT_SECRET environment variable");
			const tokenString = authorization.replace("Bearer ", "");
			const token = decodeToken(tokenString, JWT_SECRET) as nextAuthToken | undefined;

			// const token = (await getToken({
			// 	req,
			// 	secret: JWT_SECRET,
			// })) as nextAuthToken | undefined;
			if (token?.user) {
				user = await prisma.user.findUnique({
					where: { id: token.user.id },
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
			// console.log("🚀 ~ file: context.ts ~ line 34 ~ error", error);
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
