import { ApolloServer } from "apollo-server-micro";
import micro_cors from "micro-cors";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { schema } from "@/graphql/schema";
import { createContext } from "@/graphql/context";

const cors = micro_cors();

const apolloServer = new ApolloServer({
	schema,
	context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}
	await startServer;

	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
});

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
};
