import { Variables } from "@/graphql/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createAxiosService } from "utils/axiosUtils";

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

export const createUserMutation = (variables: Variables, token = null) => {
	return useMutation(
		["createUser"],
		() =>
			createAxiosService({ query: CREATE_USER_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: (data) => {
				console.log("User created Successfully");
				return { error: null, data };
			},
			onError: (error) => {
				if (typeof error === "string") {
					console.log(error.toUpperCase());
					return { error: error.toUpperCase() };
				} else if (error instanceof AxiosError) {
					console.log(error.message);
					return { error: error.message };
				}
				console.log(error);
				return { error };
			},
		}
	);
};
export const updateUserMutation = (variables: Variables, token = null) =>
	useMutation(
		["updateUser"],
		() =>
			createAxiosService({ query: UPDATE_USER_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: (data) => {
				console.log("User updated Successfully");
				return { error: null, data };
			},
			onError: (error) => {
				if (typeof error === "string") {
					console.log(error.toUpperCase());
					return { error: error.toUpperCase() };
				} else if (error instanceof AxiosError) {
					console.log(error.message);
					return { error: error.message };
				}
				console.log(error);
				return { error };
			},
		}
	);
