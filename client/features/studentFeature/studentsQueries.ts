import { createAxiosService } from "core/utils";
import { studentMutationVariables } from "./studentTypes";

export const GET_STUDENT_DETAILS = `
    query User($userId: String!, $attendancesTake2: Int, $examsTake2: Int) {
        User(id: $userId) {
            id
            name
            isActive
            avatar
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
    query FilteredUsers($role: [Role], $data: PaginationInputType, $take: Int, $orderByList: JSONObject, $attendancesTake2: Int, $attendancesOrderByList2: JSONObject) {
        FilteredUsers(role: $role, data: $data) {
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
    query FilteredUsers($role: [Role], $take: Int, $orderByList: JSONObject, $attendancesTake2: Int, $attendancesOrderByList2: JSONObject) {
        FilteredUsers(role: $role) {
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

export const studentsListQuery = async (variable: studentMutationVariables) => {
	const {
		data: {
			data: { FilteredUsers },
		},
	} = await createAxiosService(GET_STUDENTS_LIST, variable);

	return { ...FilteredUsers };
};

export const studentsIdsQuery = async (variable: studentMutationVariables) => {
	const {
		data: {
			data: {
				FilteredUsers: { list },
			},
		},
	} = await createAxiosService(GET_USERS_IDS, variable);
	return { list };
};

export const studentDetailsQuery = async (variable: studentMutationVariables) => {
	const {
		data: {
			data: { User },
		},
	} = await createAxiosService(GET_STUDENT_DETAILS, variable);
	return { User };
};
