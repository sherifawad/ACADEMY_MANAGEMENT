import { createAxiosService } from "core/utils";

export const GET_ROLES_LIST = `
    query Query {
        roles {
            id
            name
            description
        }
    }
`;

export const rolesListQuery = async (token = null) => {
	try {
		const {
			data: {
				data: { roles },
			},
		} = await createAxiosService({ query: GET_ROLES_LIST, token });

		return { roles, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
