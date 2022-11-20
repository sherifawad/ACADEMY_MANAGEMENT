export const isNullish = (obj: any) =>
	Object.values(obj).every((value) => {
		if (value !== null) {
			return false;
		}

		return true;
	});
export const removeNullObjects = (obj: any) => {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (value === null) {
			return acc;
		}
		if (typeof value === "string" && value.trim() === "") {
			return { ...acc, [key]: undefined };
		}
		return { ...acc, [key]: value };
	}, {});
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

export const reset = (obj: any) => {
	Object.keys(obj).map((key) => {
		if (obj[key] instanceof Array) obj[key] = [];
		else if (key === "name") obj[key] = "";
		else obj[key] = undefined;
	});
};

// If you want to reset a complex object
export const recursiveReset = (obj: any) => {
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

const objectReset = function (obj: any) {
	return Object.keys(obj).reduce(
		(attrs, key) => ({
			...attrs,
			[key]: "redacted",
		}),
		{}
	);
};

export function flatten(arr: any[]) {
	return arr.reduce(function (flat, toFlatten) {
		return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	}, []);
}

export function ObjectFlatten(data: any) {
	var result = {};
	function recurse(cur: any, prop: unknown) {
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

export const getDividesNumbersFromString = (stringValue: string | null): string[] | null => {
	if (!stringValue) return null;
	return (
		stringValue
			//remove white space
			.replace(/\s+/g, "")
			// get only numbers
			.replace(/\D/g, "")
			// split every 11 cahrcter
			.match(/.{1,11}/g)
	);
};

export const getOptionsListAsString = (list: { label: string; value: string }[]): string[] =>
	list?.map((item) => item.value);

export const convertFromListToString = (list: { label: string; value: string }[]): string => {
	const data = list?.map((item) => item.value)?.toString();
	const result = data.replace(",", " ");
	return result;
};
