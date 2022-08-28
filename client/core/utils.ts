import axios from "axios";
import { getSession } from "next-auth/react";
import constants from "./constants";
import Paths from "./paths";

export interface axiosProps {
	query?: string;
	variables?: any;
	token?: string;
	url?: string;
}

export const createAxiosService = async ({
	query,
	variables = {},
	token = null,
	url = constants.END_POINT,
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

export function flatten(arr) {
	return arr.reduce(function (flat, toFlatten) {
		return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	}, []);
}

export function ObjectFlatten(data) {
	var result = {};
	function recurse(cur, prop) {
		if (Object(cur) !== cur) {
			result[prop] = cur;
		} else if (Array.isArray(cur)) {
			for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop);
			if (l == 0) result[prop] = null;
		} else {
			var isEmpty = true;
			for (var p in cur) {
				isEmpty = false;
				// recurse(cur[p], prop ? prop + "_" + p : p);
				recurse(cur[p], p);
			}
			if (isEmpty && prop) result[prop] = {};
		}
	}
	recurse(data, "");
	return result;
}

export function renameKeyValue(obj: any, oldKey: string, newKey: string, newValue: any) {
	const keyValues = Object.entries(obj).map(([key, value]) => {
		if (typeof value === "object" && value !== null && !Array.isArray(value)) {
			value = renameKeyValue(value, oldKey, newKey, newValue);
		}
		if (key === oldKey) {
			return [newKey, newValue];
		}
		return [key, value];
	});
	return Object.fromEntries(keyValues);
}

export const checkSession = async (req: any, res: any, authOptions: any) => {
	const session = await getSession(req);
	if (!session) {
		return {
			redirect: {
				destination: Paths.SignIn,
				permanent: false,
			},
		};
	}
	return session;
};
