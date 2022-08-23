import { createAxiosService } from "core/utils";
import { userVariables } from "./userTypes";

export const GET_USERS_BY_ROLES = `
    query FilteredUsers($role: [Role]) {
        FilteredUsers(role: $role) {
            list {
                id
                name
                role
                avatar
                isActive
                contact {
                    email
                    phone
                }
            }
        }
    }
`;

export const GET_STUDENT_DETAILS = `
    query User($userId: String!, $attendancesTake2: Int, $examsTake2: Int) {
        User(id: $userId) {
            id
            name
            isActive
            avatar
            role
            contact {
                    note
                    phone
                    parentsPhones
                    address
                    email
            }
            profile {
                bio
                group {
                    id
                    name
                    isActive
                    startAt
                    endAt
                    grade {
                        id
                        name
                    }
                }
                attendances(take: $attendancesTake2) {
                    startAt
                    endAt
                    note
                }
                exams(take: $examsTake2) {
                    note
                    score
                    date
                }
                family{
                    id
                    familyName
                }
            }
        }
    }
`;

export const GET_USER_DETAILS = `
    query User($userId: String!) {
        User(id: $userId) {
            id
            name
            isActive
            avatar
            role,
            contact {
                phone
                address
                email
            }
        }
    }
`;

export const GET_USERS_IDS = `
    query FilteredUsers($role: [Role]) {
        FilteredUsers(role: $role) {
            prevCursor
            nextCursor
            totalCount {
                _count
            }
            list {
                id
            }
        }
    }
`;
export const GET_STUDENTS_paginated_LIST = `
    query FilteredUsers( $data: PaginationInputType, $take: Int, $orderByList: JSONObject, $attendancesTake2: Int, $attendancesOrderByList2: JSONObject, $userRole: [Role], $familyId: String) {
        FilteredUsers( data: $data, user_role: $userRole, family_Id: $familyId) {
            totalCount {
                _count
            }
            prevCursor
            nextCursor
            list {
                id
                name
                isActive
                avatar
                profile {
                    exams(take: $take, orderByList: $orderByList) {
                        score
                    }
                    attendances(take: $attendancesTake2, orderByList: $attendancesOrderByList2) {
                        startAt
                        endAt
                    }
                }
            }
        }
}
`;
export const GET_STUDENTS_LIST = `
    query FilteredUsers($take: Int, $orderByList: JSONObject, $attendancesTake2: Int, $attendancesOrderByList2: JSONObject, $familyId: String, $userRole: [Role]) {
        FilteredUsers(family_Id: $familyId, user_role: $userRole) {
            list {
                id
                name
                isActive
                avatar
                profile {
                    exams(take: $take, orderByList: $orderByList) {
                        score
                    }
                    attendances(take: $attendancesTake2, orderByList: $attendancesOrderByList2) {
                        startAt
                        endAt
                    }
                }
            }
        }
    }
`;

export const usersByRolesListQuery = async (variables: { role: string[] }, token = null) => {
	const {
		data: {
			data: { FilteredUsers },
		},
	} = await createAxiosService({ query: GET_USERS_BY_ROLES, variables, token });

	return { ...FilteredUsers };
};

export const studentsListQuery = async (variables: userVariables, token = null) => {
	const {
		data: {
			data: { FilteredUsers },
		},
	} = await createAxiosService({ query: GET_STUDENTS_LIST, variables, token });

	return { ...FilteredUsers };
};

export const studentsIdsQuery = async (variables: userVariables, token = null) => {
	const {
		data: {
			data: {
				FilteredUsers: { list },
			},
		},
	} = await createAxiosService({ query: GET_USERS_IDS, variables, token });
	return { list };
};

export const userDetailsQuery = async (variables: userVariables, token = null) => {
	const {
		data: {
			data: { User },
		},
	} = await createAxiosService({ query: GET_USER_DETAILS, variables, token });
	return { User };
};

export const studentDetailsQuery = async (variables: userVariables, token = null) => {
	const {
		data: {
			data: { User },
		},
	} = await createAxiosService({ query: GET_STUDENT_DETAILS, variables, token });
	return { User };
};
