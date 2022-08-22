import { createAxiosService } from "core/utils";
import { Variables } from "features/core/types";
import { useMutation } from "react-query";

export const LOGIN_MUTATION = `
    mutation UserLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            accessTokenExpiresIn
            accessToken
            refreshTokenExpiresIn
            refreshToken
            user {
                id
                name
                isActive
                avatar
                role
            }
        }
    }
`;

export const REFRESH_TOKEN_MUTATION = `
    mutation Mutation($userId: String!, $token: String!) {
        refreshToken(userId: $userId, token: $token) {
            accessTokenExpiresIn
            accessToken
        }
    }
`;

export const REVOKE_TOKEN_MUTATION = `
    mutation RevokeToken($userId: String!, $token: String!) {
        revokeToken(userId: $userId, token: $token) {
            userId
        }
    }
`;

export const revokeRefreshToken = async (variables: Variables) => {
	const { data: refreshToken, errors } = await createAxiosService({
		query: REVOKE_TOKEN_MUTATION,
		variables,
	}).then((response) => response.data);
	return { ...refreshToken, errors };
};

export const getRefreshToken = async (variables: Variables) => {
	const { data: refreshToken, errors } = await createAxiosService({
		query: REFRESH_TOKEN_MUTATION,
		variables,
	}).then((response) => response.data);
	return { ...refreshToken?.refreshToken, errors };
};

export const userLogin = async (variables: Variables) => {
	const { userLogin = {}, err = null } = await createAxiosService({ query: LOGIN_MUTATION, variables })
		.then((response) => response.data.data)
		.catch((err) => {
			err;
		});
	return { ...userLogin, err };
};
