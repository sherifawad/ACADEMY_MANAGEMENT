import { createAxiosService } from "core/utils";

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

export const usersByRolesListQuery = async (variable: { role: string[] }) => {
	const {
		data: {
			data: { FilteredUsers },
		},
	} = await createAxiosService(GET_USERS_BY_ROLES, variable);

	return { ...FilteredUsers };
};
