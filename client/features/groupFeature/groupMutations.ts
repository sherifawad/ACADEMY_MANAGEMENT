import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { groupVariables } from "./groupTypes";

export const ADD_GROUP_MUTATION = `
    mutation Mutation($name: String!, $startAt: DateTime, $endAt: DateTime, $isActive: Boolean, $gradeId: String) {
        createGroup(name: $name, startAt: $startAt, endAt: $endAt, isActive: $isActive, gradeId: $gradeId) {
            id
        }
    }
`;

export const DELETE_GROUP_MUTATION = `
    mutation DeleteGroup($deleteGroupId: String!) {
        deleteGroup(id: $deleteGroupId) {
            id
        }
    }
`;
export const UPDATE_GROUP_MUTATION = `
    mutation UpdateGroup($updateGroupId: String!, $name: String, $startAt: DateTime, $endAt: DateTime, $isActive: Boolean, $gradeId: String) {
        updateGroup(id: $updateGroupId, name: $name, startAt: $startAt, endAt: $endAt, isActive: $isActive, gradeId: $gradeId) {
            id
        }
    }
`;

export const createGroupMutation = (variables: groupVariables, token = null) => {
	try {
		return useMutation(
			"AddGroup",
			() =>
				createAxiosService({
					query: ADD_GROUP_MUTATION,
					variables,
					token,
				}).then((response) => response.data.data),
			{
				onSuccess: () => {
					console.log("Creation is a Success");
				},
			}
		);
	} catch (error) {}
};

export const deleteGroupMutation = (variables: groupVariables, token = null) => {
	try {
		return useMutation(
			"DeleteGroup",
			() =>
				createAxiosService({
					query: DELETE_GROUP_MUTATION,
					variables,
					token,
				}).then((response) => response.data.data),
			{
				onSuccess: () => {
					console.log("Deletion is a Success");
				},
			}
		);
	} catch (error) {}
};

export const updateGroupMutation = (variables: groupVariables, token = null) => {
	try {
		return useMutation(
			"UpdateGroup",
			() =>
				createAxiosService({
					query: UPDATE_GROUP_MUTATION,
					variables,
					token,
				}).then((response) => response.data.data),
			{
				onSuccess: () => {
					console.log("Update is a Success");
				},
			}
		);
	} catch (error) {}
};
