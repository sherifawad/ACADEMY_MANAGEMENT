export const isNullish = (obj: any) =>
	Object.values(obj).every((value) => {
		if (value !== null) {
			return false;
		}

		return true;
	});
export const removeNullObjects = (obj: any) =>
	Object.entries(obj).reduce((acc, [key, value]) => {
		if (value === null) {
			return acc;
		}
		return { [key]: value };
	}, {});
