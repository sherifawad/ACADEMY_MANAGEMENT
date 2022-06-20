import { createHttpLink, HttpOptions } from "@apollo/client";

export const setAuthToken = (token: string | null | undefined = null) => {
	const options: HttpOptions = {
		uri: "http://localhost:4000/graphql",
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	};

	return createHttpLink(options);
};
