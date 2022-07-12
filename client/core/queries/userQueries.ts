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
    query FilteredUsers($data: UsersFilterInputType) {
        FilteredUsers(data: $data) {
            id
        }
    }
`;

export const GET_STUDENT_DETAILS = `
    query Query($userId: String!) {
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
            exams {
                note
                score
                date
            }
            attendances {
                note
                startAt
                endAt
            }
        }
        }
    }
`;