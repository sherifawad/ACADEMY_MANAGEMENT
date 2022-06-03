import { createHttpLink, HttpOptions } from "@apollo/client";

export const setAuthToken = (token: string | null | undefined = null) => {
	const options: HttpOptions = {
		uri: "http://localhost:3000/api/graphql",
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	};

	return createHttpLink(options);
};
