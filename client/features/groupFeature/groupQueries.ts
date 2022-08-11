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

export const getGroups = async () => {
	try {
		const {
			data: {
				data: { Groups },
			},
		} = await createAxiosService(GROUPS_QUERY);
		return { Groups };
	} catch (error) {
		return {};
	}
};
export const getGroupsIds = async () => {
	try {
        const {
            data: {
                data: { Groups },
            },
        } = await createAxiosService(GROUPS_IDS_QUERY);
		return { Groups };
	} catch (error) {
		return {};
	}
};

export const getGroupStudents = async (variables: groupVariables) => {
	try {
		const {
			data: {
				data: {
					Group: { name, profiles },
				},
			},
		} = await createAxiosService(GROUP_STUDENTS_QUERY, variables);
		return { name, ...profiles };
	} catch (error) {
		return {};
	}
};
