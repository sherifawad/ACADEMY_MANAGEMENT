import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
	mutation UserLogin($email: String!, $password: String!) {
		userLogin(email: $email, password: $password) {
			token
			refreshToken
			user {
				id
				name
				avatar
				email
				role
				emailConfirmed
			}
		}
	}
`;
