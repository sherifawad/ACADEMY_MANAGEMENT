import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { userVariables } from "./userTypes";

export const CREATE_USER_MUTATION = `
    mutation UserRegister($name: String!, $role: Role!, $email: String!, $password: String!, $address: String, $parentsPhones: String, $phone: String, $avatar: String, $groupId: String, $familyName: String, $familyId: String) {
        userRegister(name: $name, role: $role, email: $email, password: $password, address: $address, parentsPhones: $parentsPhones, phone: $phone, avatar: $avatar, groupId: $groupId, familyName: $familyName, familyId: $familyId) {
            id
        }
    }
}
`;

export const UPDATE_USER_MUTATION = `
    mutation UserUpdate($userUpdateId: String!, $avatar: String, $role: Role, $name: String, $email: String, $password: String, $address: String, $parentsPhones: String, $phone: String, $groupId: String, $familyName: String) {
        userUpdate(id: $userUpdateId, avatar: $avatar, role: $role, name: $name, email: $email, password: $password, address: $address, parentsPhones: $parentsPhones, phone: $phone, groupId: $groupId, familyName: $familyName,) {
            id
        }
    }
`;

export const createUserMutation = (variables: userVariables, token = null) =>
	useMutation(
		"createUser",
		() =>
			createAxiosService({ query: CREATE_USER_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("User created Successfully");
			},
		}
	);
export const updateUserMutation = (variables: userVariables, token = null) =>
	useMutation(
		"updateUser",
		() =>
			createAxiosService({ query: UPDATE_USER_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("User updated Successfully");
			},
		}
	);
