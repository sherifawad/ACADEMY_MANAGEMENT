import { createAxiosService } from "core/utils";
import { roleVariables } from "./roleTypes";

export const GET_ROLES_LIST = `
    query Query {
        roles {
            id
            name
            description
        }
    }
`;
export const GET_ROLE_Details = `
    query Query($roleId: Int!) {
        role(roleId: $roleId) {
            name
            description
            Role_Domain_Permission {
                domain {
                    name
                    id
                }
                permission {
                    name
                    id
                }
            }
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

export const roleByIdQuery = async (variables: roleVariables, token = null) => {
	try {
		const {
			data: {
				data: { role },
			},
		} = await createAxiosService({ query: GET_ROLE_Details, variables, token });

		return { role, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
