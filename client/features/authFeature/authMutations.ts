import { createAxiosService } from "core/utils";
import { Variables } from "features/core/types";
import { useMutation } from "react-query";

export const LOGIN_MUTATION = `
mutation Mutation($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            token
            user {
                id
                name
                isActive
                avatar
                role
                contact {
                    email
                }
            }
            refreshToken
        }
    }
`;

export const REFRESH_TOKEN_MUTATION = `
	mutation Mutation($userId: String!, $token: String!) {
		refreshToken(userId: $userId, token: $token) {
			token
		}
	}
`;

export const REVOKE_TOKEN_MUTATION = `
	mutation Mutation($userId: String!, $token: String!) {
		revokeToken(userId: $userId, token: $token) {
			refreshToken
		}
	}
`;

export const userLogin = async (variables: Variables) => {
	const { userLogin = {} } = await createAxiosService(LOGIN_MUTATION, variables).then(
		(response) => response.data.data
	);
	return { ...userLogin };
};
