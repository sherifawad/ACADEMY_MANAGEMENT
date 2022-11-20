import { DateTimeResolver, GraphQLDID, GraphQLJSONObject, TimeResolver } from "graphql-scalars";
import { asNexusMethod, inputObjectType, objectType } from "nexus";
import { User } from "./User";

export * from "./User";
export * from "./Exam";
export * from "./Grade";
export * from "./Group";
export * from "./Profile";
export * from "./Attendance";
export * from "./Contact";
export * from "./Family";
export * from "./Role";

export interface Variables {
	[x: string]: any;
}

export interface CursorPaginationInput {
	take?: number | null;
	skip?: number | null; // Skip the cursor
	myCursor?: string | null;
	sort?: any[] | null;
}
export interface CursorPagination {
	take?: number;
	skip?: number; // Skip the cursor
	cursor?: {
		id: string;
	};
	orderBy?: { [x: string]: string };
}

export interface UserFilter {
	role?: any | null;
	isActive?: boolean | null;
	groupId?: string | null;
	familyId?: string | null;
}
export interface UserFilterPagination extends CursorPagination {
	where?: UserFilter;
}
export interface UserFilterPaginationInput extends UserFilter {
	PaginationInputType?: CursorPaginationInput | null;
}

export const date = asNexusMethod(DateTimeResolver, "date");
export const Time = asNexusMethod(TimeResolver, "date");
export const JSONObject = asNexusMethod(GraphQLJSONObject, "JSONObject");
export const id = asNexusMethod(GraphQLDID, "id");

export const PaginationInputType = inputObjectType({
	name: "PaginationInputType",
	definition(t) {
		t.nullable.string("myCursor");
		t.nullable.int("take");
		t.nullable.int("skip");
		t.list.nullable.field("sort", { type: "JSONObject" });
	},
});

export const paginationResult = async (query: any) => {
	let prevCursor: string | undefined | null;
	let nextCursor: string | undefined | null;

	const result = query;
	if (result && result.length > 0) {
		nextCursor = result[result?.length - 1]?.id;
		prevCursor = result[0]?.id;
	}

	return {
		list: result,
		prevCursor,
		nextCursor,
	};
};

export const UserFilterInputType = inputObjectType({
	name: "UsersFilterInputType",
	definition(t) {
		// t.nullable.field("PaginationInputType", {
		// 	type: "PaginationInputType",
		// });
		t.nullable.list.int("rolesIdsList");
		t.nullable.boolean("isActive");
		t.nullable.string("StudentId");
		t.nullable.string("familyId");
	},
});

export const Count = objectType({
	name: "Count",
	definition(t) {
		t.int("_count");
	},
});

export const UsersResponse = objectType({
	name: "UsersResponse",
	definition(t) {
		t.list.field("list", {
			type: User,
		});
		t.string("prevCursor");
		t.nullable.string("nextCursor");
		t.nullable.field("totalCount", { type: Count });
	},
});

export const StudentsResponse = objectType({
	name: "StudentsResponse",
	definition(t) {
		t.field("students", {
			type: UsersResponse,
		});
		t.nullable.string("groupName");
	},
});

export function getKeys(obj: any) {
	let keyName;
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (typeof value === "object") {
			return { ...acc, [key]: value };
		}
		return acc;
	}, {});
}

export const queryArgs = (args: any, filter = {}) => {
	const { take, skip, myCursor, orderByKey, orderDirection, sort } = args || {};

	let data = {};
	if (myCursor) {
		data = {
			...data,
			skip: 1, // Skip the cursor
			cursor: {
				id: myCursor,
			},
		};
	}

	if (skip) {
		data = {
			...data,
			skip,
		};
	}

	if (sort) {
		data = {
			...data,
			orderBy: sort,
		};
	}

	if (take) {
		data = { ...data, take: Number(take) };
	}

	if (filter) {
		data = { ...data, where: filter };
	}
	return data;
};
