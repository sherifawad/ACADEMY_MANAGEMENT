import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { userMutationVariables } from "./userTypes";

export const LOGIN_MUTATION = `
	mutation Mutation($email: String!, $password: String!) {
		userLogin(email: $email, password: $password) {
			token
			refreshToken
			user {
				name
				id
				avatar
				role
				contact {
					email
					phone
				}
			}
		}
	}
`;

export const SIGN_UP_MUTATION = `
    mutation UserRegister($name: String!, $role: Role!, $password: String!, $address: String!, $phone: String!, $email: String, $parentsPhones: String, $avatar: String, $groupId: String) {
        userRegister(name: $name, role: $role, password: $password, address: $address, phone: $phone, email: $email, parentsPhones: $parentsPhones, avatar: $avatar, groupId: $groupId) {
            id
        }
}
`;

export const UPDATE_USER_MUTATION = `
    mutation UserUpdate($userUpdateId: String!, $avatar: String, $role: Role, $name: String, $email: String, $password: String, $address: String, $parentsPhones: String, $phone: String, $groupId: String) {
        userUpdate(id: $userUpdateId, avatar: $avatar, role: $role, name: $name, email: $email, password: $password, address: $address, parentsPhones: $parentsPhones, phone: $phone, groupId: $groupId) {
            id
        }
    }
`;

export const updateUserMutation = (variables: userMutationVariables) =>
	useMutation(
		"updateUser",
		() => createAxiosService(UPDATE_USER_MUTATION, variables).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("User updated Successfully");
			},
		}
	);
