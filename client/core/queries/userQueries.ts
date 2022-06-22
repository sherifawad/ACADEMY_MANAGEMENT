export const GET_USERS = `
    query Users {
        Users {
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
