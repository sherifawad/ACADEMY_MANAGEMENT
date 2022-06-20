import { gql } from "@apollo/client";

export const ADD_GROUP_MUTATION = gql`
	mutation Mutation($name: String!, $startAt: String, $endAt: String) {
		createGroup(name: $name, startAt: $startAt, endAt: $endAt) {
			id
		}
	}
`;
