import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export type Context = {
	prisma: PrismaClient;
	session: any; // TODO: set session types
};

export async function createContext({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}): Promise<Context> {
	const session = await getSession({ req }); // TODO: credentials not working on graphql studio (/api/graphql)
	return {
		prisma,
		session: session,
	};
}
