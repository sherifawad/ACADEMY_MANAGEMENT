import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { schema } from "../../graphql/schema";
import { createContext } from "../../graphql/context";
import { cors } from "Middlewares/CorsMiddleWare";

// const apolloServer = new ApolloServer({
// 	context: createContext,
// 	schema,
// });

// const startServer = apolloServer.start();

// const main = async (req: NextApiRequest, res: NextApiResponse) => {
// 	// res.setHeader("Access-Control-Allow-Credentials", "true");
// 	// res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
// 	// res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	if (req.method === "OPTIONS") {
// 		res.end();
// 		return false;
// 	}
// 	// run middleware
// 	await cors(req, res);

// 	await startServer;
// 	await apolloServer.createHandler({
// 		path: "/api/graphql",
// 	})(req, res);
// };

// export default main;

// export const config: PageConfig = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

export const server = new ApolloServer({
	context: createContext,
	schema,
});

const serverStart = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	//cors origin middleware
	cors(req, res);
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}
	// schema-wide middleware

	await serverStart;
	return await server.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
