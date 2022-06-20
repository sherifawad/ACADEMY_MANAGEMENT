import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
	mutation Mutation($userId: String!, $token: String!) {
		refreshToken(userId: $userId, token: $token) {
			token
		}
	}
`;

export const REVOKE_TOKEN_MUTATION = gql`
	mutation Mutation($userId: String!, $token: String!) {
		revokeToken(userId: $userId, token: $token) {
			refreshToken
		}
	}
`;
