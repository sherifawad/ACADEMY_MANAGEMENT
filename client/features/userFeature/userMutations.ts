import { createAxiosService } from "core/utils";
import { useMutation } from "@tanstack/react-query";
import { userVariables } from "./userTypes";

export const CREATE_USER_MUTATION = `
    mutation Mutation($name: String!, $roleId: Int!, $password: String!, $email: String, $address: String, $parentsPhones: String, $phone: String, $avatar: String, $groupId: String, $familyName: String, $familyId: String, $familyListIds: [String]) {
        userRegister(name: $name, roleId: $roleId, password: $password, email: $email, address: $address, parentsPhones: $parentsPhones, phone: $phone, avatar: $avatar, groupId: $groupId, familyName: $familyName, familyId: $familyId, familyListIds: $familyListIds) {
            id
        }
    }
`;

export const UPDATE_USER_MUTATION = `
    mutation Mutation($userUpdateId: String!, $avatar: String, $roleId: Int, $name: String, $email: String, $password: String, $address: String, $parentsPhones: String, $phone: String, $groupId: String, $familyName: String, $familyId: String, $familyListIds: [String]) {
        userUpdate(id: $userUpdateId, avatar: $avatar, roleId: $roleId, name: $name, email: $email, password: $password, address: $address, parentsPhones: $parentsPhones, phone: $phone, groupId: $groupId, familyName: $familyName, familyId: $familyId, familyListIds: $familyListIds) {
            id
        }
    }
`;

export const createUserMutation = (variables: userVariables, token = null) => {
	return useMutation(
		["createUser"],
		() =>
			createAxiosService({ query: CREATE_USER_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("User created Successfully");
			},
			onError: (error) => {
				console.log("🚀 ~ file: userMutations.ts ~ line 33 ~ createUserMutation ~ error", error);
			},
		}
	);
};
export const updateUserMutation = (variables: userVariables, token = null) =>
	useMutation(
		["updateUser"],
		() =>
			createAxiosService({ query: UPDATE_USER_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("User updated Successfully");
			},
			onError: (error) => {
				console.log("🚀 ~ file: userMutations.ts ~ line 47 ~ error", error);
			},
		}
	);
