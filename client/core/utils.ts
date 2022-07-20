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

export const reset = (obj) => {
	Object.keys(obj).map((key) => {
		if (obj[key] instanceof Array) obj[key] = [];
		else if (key === "name") obj[key] = "";
		else obj[key] = undefined;
	});
};

// If you want to reset a complex object
export const recursiveReset = (obj) => {
	Object.keys(obj).map((key) => {
		// Test if it's an Object
		if (obj[key] === Object(obj[key])) {
			recursiveReset(obj[key]);
			return;
		}
		if (obj[key] instanceof Array) obj[key] = [];
		else if (obj[key] instanceof String) obj[key] = "";
		else obj[key] = undefined;
	});
};

const defaults = {
	String: undefined,
	Array: [],
	bool: false,
};

const objectReset = function (obj) {
	return Object.keys(obj).reduce(
		(attrs, key) => ({
			...attrs,
			[key]: "redacted",
		}),
		{}
	);
};
