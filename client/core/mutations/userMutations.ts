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
	mutation Mutation(
		$email: String!
		$password: String!
		$address: String!
		$parentsPhones: String!
		$avatar: String
		$phone: String
	) {
		userRegister(
			email: $email
			password: $password
			address: $address
			parentsPhones: $parentsPhones
			avatar: $avatar
			phone: $phone
		) {
			name
			id
		}
	}
`;

export const STUDENT_REGISTER_MUTATION = `
    mutation Mutation($email: String!, $password: String!, $address: String!, $phone: String!, $groupId: String!, $name: String, $parentsPhones: String) {
        studentRegister(email: $email, password: $password, address: $address, phone: $phone, groupId: $groupId, name: $name, parentsPhones: $parentsPhones) {
            id
        }
    }
`;
