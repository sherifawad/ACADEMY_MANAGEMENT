export const GET_USERS = `
    query Users {
        Users {
            id
            name
            isActive
            avatar
            contact {
                email
            }
            profile {
                group {
                    name
                    grade {
                        name
                    }
                }
            }
        }
    }
`;

export const GET_USERS_IDS = `
    query FilteredUsers($role: Role) {
        FilteredUsers(role: $role) {
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
                    name
                    isActive
                    startAt
                    endAt
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
