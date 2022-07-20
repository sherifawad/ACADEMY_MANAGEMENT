import axios from "axios";
import constants from "./constants";

export const createAxiosService = async (
	query: string,
	variables = {},
	token: string = null,
	endPoint: string = constants.END_POINT
) => {
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
		url: endPoint,
		method: "post",
		headers: headers,
		data: graphqlQuery,
	});
};

export const getDayNames = (date: String, firstThreeLetter: boolean = false): string => {
	return date
		? new Date(date as string)
				.toLocaleDateString("en-US", {
					weekday: `${firstThreeLetter ? "short" : "long"}`,
				})
				.substring(0, 3)
		: "";
};
