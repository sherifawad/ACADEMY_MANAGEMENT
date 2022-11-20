import axios from "axios";
import { Paths } from "core/paths";

export interface axiosProps {
	query?: string;
	variables?: any;
	token?: string | null;
	url?: string;
}

export const createAxiosService = async ({
	query,
	variables = {},
	token = null,
	url = Paths.END_POINT,
}: axiosProps) => {
	let headers: any = {
		"content-type": "application/json",
	};
	if (token) {
		headers = { ...headers, Authorization: `${token}` };
	}
	const graphqlQuery = {
		// operationName: "fetchGrades",
		query: query,
		variables: { ...variables },
	};
	return await axios({
		url,
		method: "post",
		headers: headers,
		data: query ? graphqlQuery : variables,
	});
};
