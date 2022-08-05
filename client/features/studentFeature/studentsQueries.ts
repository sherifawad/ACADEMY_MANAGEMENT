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
    query FilteredUsers($role: Role) {
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
