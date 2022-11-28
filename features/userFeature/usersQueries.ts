import { Variables } from "@/graphql/types";
import { AxiosError } from "axios";
import Error from "next/error";
import { createAxiosService } from "utils/axiosUtils";

export const GET_USERS_BY_ROLES = `
    query FilteredUsers($roleIds: [Int]) {
        FilteredUsers(roleIds: $roleIds) {
            list {
                id
                name
                roleId
                image
                email
                isActive
                contact {
                    phone
                }
            }
        }
    }
`;

export const GET_USERS_BY_FAMILY_NAME = `
    query Query($familyName: String, $roleIds: [Int]) {
        FilteredUsers(familyName: $familyName, roleIds: $roleIds) {
        list {
            family {
                familyName
                id
            }
        }
        }
    }
`;

export const GET_STUDENT_DETAILS = `
    query Query($userId: String!, $take: Int, $orderByList: JSONObject, $attendancesTake2: Int, $attendancesOrderByList2: JSONObject) {
        User(id: $userId) {
            id
            name
            isActive
            email
            emailConfirmed
            avatar
            familyId
            role {
                id
            }
            profile {
                bio
                exams(take: $take, orderByList: $orderByList) {
                note
                id
                score
                date
                }
                attendances(take: $attendancesTake2, orderByList: $attendancesOrderByList2) {
                    id
                    startAt
                    endAt
                    note
                }
                group {
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
            family {
                id
                familyName
            }
            contact {
                note
                phone
                parentsPhones
                address
            }
        }
    }
`;

export const GET_USER_DETAILS = `
query Query($userId: String!) {
        User(id: $userId) {
            name
            id
            isActive
            avatar
            roleId
            email
            emailConfirmed
            contact {
                id
                note
                phone
                parentsPhones
                address
            }
            role {
                id
                name
                description
            }
        }
    }
`;

export const GET_USERS_IDS = `
    query FilteredUsers($roleIds: [Int]) {
        FilteredUsers(roleIds: $roleIds) {
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
    query FilteredUsers( $data: PaginationInputType, $take: Int, $orderByList: JSONObject, $attendancesTake2: Int, $attendancesOrderByList2: JSONObject, $roleIds: [Int], $familyId: String) {
        FilteredUsers( data: $data,roleIds: $roleIds, family_Id: $familyId) {
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
    query Query($data: PaginationInputType, $roleIds: [Int]) {
        FilteredUsers(data: $data, roleIds: $roleIds) {
        list {
            name
            id
            avatar
            email
            isActive
            contact {
                phone
                parentsPhones
                address
            }
        }
        prevCursor
        nextCursor
        totalCount {
            _count
        }
        }
    }
`;

export const GET_USERS_BY_PARENT_PHONES_LIST = `
    query FilteredUsersByPhoneQuery($phones: [String]!, $roleId: Int!) {
        FilteredUsersByPhoneQuery(phones: $phones, roleId: $roleId) {
            id
            name
            family {
                id
                familyName
            }
        }
    }
`;

export const usersByFamilyNameListQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: { FilteredUsers: { list = {} } = {} },
			},
		} = await createAxiosService({ query: GET_USERS_BY_FAMILY_NAME, variables, token });

		return { list, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error: error };
	}
};

export const usersByPhonesListQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: { FilteredUsersByPhoneQuery },
			},
		} = await createAxiosService({ query: GET_USERS_BY_PARENT_PHONES_LIST, variables, token });

		return { FilteredUsersByPhoneQuery, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error };
	}
};

export const usersByRolesListQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: { FilteredUsers },
			},
		} = await createAxiosService({ query: GET_USERS_BY_ROLES, variables, token });

		return { ...FilteredUsers, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error };
	}
};

export const studentsListQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: { FilteredUsers },
			},
		} = await createAxiosService({ query: GET_STUDENTS_LIST, variables, token });

		return { ...FilteredUsers, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error };
	}
};

export const studentsIdsQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: {
					FilteredUsers: { list },
				},
			},
		} = await createAxiosService({ query: GET_USERS_IDS, variables, token });
		return { list, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error };
	}
};

export const userDetailsQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: { User },
			},
		} = await createAxiosService({ query: GET_USER_DETAILS, variables, token });
		return { User, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error };
	}
};

export const studentDetailsQuery = async (variables: Variables, token = null) => {
	try {
		const {
			data: {
				data: { User },
			},
		} = await createAxiosService({ query: GET_STUDENT_DETAILS, variables, token });
		return { User, error: null };
	} catch (error) {
		if (typeof error === "string") {
			return { error: error.toUpperCase() };
		} else if (error instanceof AxiosError) {
			return { error: error.message };
		}
		return { error };
	}
};
