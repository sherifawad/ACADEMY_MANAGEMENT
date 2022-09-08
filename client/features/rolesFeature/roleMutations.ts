import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { roleVariables } from "./roleTypes";

export const CREATE_ROLE_MUTATION = `
    mutation Mutation($name: String!, $description: String) {
        createRole(name: $name, description: $description) {
            id
        }
    }
`;

export const UPDATE_ROLE_MUTATION = `
    mutation UpdateRole($roleId: Int!, $name: String, $description: String) {
        updateRole(roleId: $roleId, name: $name, description: $description) {
            id
        }
    }
`;

export const createRoleMutation = (variables: roleVariables, token = null) =>
	useMutation(
		"createRole",
		() =>
			createAxiosService({ query: CREATE_ROLE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("role created Successfully");
			},
		}
	);
export const updateRoleMutation = (variables: roleVariables, token = null) =>
	useMutation(
		"updateRole",
		() =>
			createAxiosService({ query: UPDATE_ROLE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("role updated Successfully");
			},
		}
	);
