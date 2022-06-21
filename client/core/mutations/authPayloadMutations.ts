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
