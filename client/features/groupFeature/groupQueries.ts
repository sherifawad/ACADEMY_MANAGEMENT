import { createAxiosService } from "core/utils";
import { groupVariables } from "./groupTypes";

export const GROUPS_QUERY = `
	query Groups {
		Groups {
            id
            isActive
            name
            startAt
            endAt
            grade {
                id
                name
            }
		}
	}
`;

export const GROUPS_IDS_QUERY = `
    query Groups {
        Groups {
            id
            name
        }
    }
`;

export const GROUP_NAME_QUERY = `
    query Group($groupId: String!) {
        Group(id: $groupId) {
            name
        }
    }
`;
export const GROUP_STUDENTS_QUERY = `
    query Group($groupId: String!, $data: PaginationInputType) {
        Group(id: $groupId) {
            name
            profiles(data: $data) {
                list {
                    user {
                        id
                        name
                        isActive
                        avatar
                    }
                }
                prevCursor
                nextCursor
                totalCount {
                    _count
                }
            }
        }
    }
`;

export const getGroups = async (token = null) => {
	try {
		const {
			data: {
				data: { Groups },
			},
		} = await createAxiosService({ query: GROUPS_QUERY, token });
		return { Groups, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
export const getGroupsIds = async (token = null) => {
	try {
		const {
			data: {
				data: { Groups },
			},
		} = await createAxiosService({ query: GROUPS_IDS_QUERY, token });
		return { Groups, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};

export const getGroupStudents = async (variables: groupVariables, token = null) => {
	try {
		const {
			data: {
				data: {
					Group: { name, profiles },
				},
			},
		} = await createAxiosService({ query: GROUP_STUDENTS_QUERY, variables, token });
		return { name, ...profiles, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
