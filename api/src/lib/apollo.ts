import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
let NormalizedApolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
	NormalizedApolloClient = new ApolloClient({
		uri: "http://localhost:3000/api/graphql",

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

	return NormalizedApolloClient;
};

export const apolloClient = NormalizedApolloClient ?? createApolloClient();