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
export const GROUP_STUDENTS = `
    query Paginated($data: UsersFilterInputType) {
        Paginated(data: $data) {
            list {
                id
                name
                isActive
                avatar
            }
            nextCursor
            totalCount {
                _count
            }
            groupName
        }
    }
`;

export const GET_STUDENT_DETAILS = `
    query Query($userId: String!, $take: Int) {
        User(id: $userId, take: $take) {
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
                emailConfirmed
            }
            profile {
                bio
                group {
                    name
                    isActive
                    startAt
                    endAt
                    grade {
                        isActive
                        name
                    }
                }
                exams(take: $take) {
                    note
                    score
                    date
                }
                attendances(take: $take) {
                    note
                    startAt
                    endAt
                }
            }
        }
    }
`;
