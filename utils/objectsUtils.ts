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
