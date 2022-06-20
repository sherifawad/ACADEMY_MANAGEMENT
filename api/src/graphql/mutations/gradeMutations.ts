import { gql } from "@apollo/client";

export const ADD_GRADE_MUTATION = gql`
	mutation CreateGrade($name: String!) {
		createGrade(name: $name) {
			isActive
			name
		}
	}
`;
