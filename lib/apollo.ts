import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZjFiMmQ0MC1lZTNhLTRlZTctOTUyNy04MjE2ZTQ5ZGIyZGEiLCJpYXQiOjE2NTM1NzEyMjMsImV4cCI6MTY1MzU3MTgyM30.yV66InUYNx-Io_lI6M410ZNxAbmuCf5ZZmqJDUeU0K8";

export const apolloClient = new ApolloClient({
	uri: "http://localhost:3000/api/graphql",
	headers: {
		authorization: "",
	},
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					links: relayStylePagination(),
				},
			},
		},
	}),
});
