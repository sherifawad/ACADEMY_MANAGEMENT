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
                family {
                    id
                }            
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
    mutation RevokeToken($revokeTokenId: String!, $token: String!) {
        revokeToken(id: $revokeTokenId, token: $token) {
            userId
        }
    }
`;

export const revokeRefreshToken = async (variables: Variables, token = null) => {
	const { data: refreshToken, errors } = await createAxiosService({
		query: REVOKE_TOKEN_MUTATION,
		variables,
		token,
	}).then((response) => response.data);
	return { ...refreshToken?.refreshToken, errors };
};

export const getAccessToken = async (variables: Variables, token = null) => {
	try {
		const { data } = await createAxiosService({
			url: "http://localhost:7010/api/auth/accesstoken    ",
			variables,
			token: `Bearer ${token}`,
		});
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error.message };
	}
};

export const userLogin = async (variables: Variables) => {
	try {
		const { data } = await createAxiosService({
			url: "http://localhost:7010/api/auth/login",
			variables,
		});
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error.message };
	}
};
export const getHubLogin = async (variables: Variables) => {
	try {
		const { data } = await createAxiosService({
			url: "http://localhost:7010/api/auth/login",
			variables,
		});
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error.message };
	}
};
