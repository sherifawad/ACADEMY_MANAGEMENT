import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { createContext } from "./graphql/context";
import { schema } from "./graphql/schema";
import cookieParser from "cookie-parser";
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

const IS_DEV = process.env.NODE_ENV === "development";
const localOrigins = [/^http:\/\/localhost:\d{4}$/, "https://studio.apollographql.com"];
const prodOrigins = [/^https:\/\/.*\.yourdomain\.com$/];

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema,
		context: createContext,
		// plugins: [
		// 	ApolloServerPluginDrainHttpServer({ httpServer }),
		// 	ApolloServerPluginLandingPageGraphQLPlayground(),
		// ],
	});
	await server.start();

	app.use(cookieParser());

	server.applyMiddleware({
		app,
		cors: {
			origin: IS_DEV ? localOrigins : prodOrigins,
			credentials: true,
		},
	});
	await new Promise<void>((resolve) => {
		httpServer.listen({ port: 4000 });
		resolve();
	});
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

// Start server
startApolloServer();
