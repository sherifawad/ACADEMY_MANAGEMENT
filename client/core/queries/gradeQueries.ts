import { gql } from "@apollo/client";

export const GRADES_QUERY = gql`
	query Grades {
		Grades {
			isActive
			name
		}
	}
`;

export const ACTIVE_GRADES_QUERY = gql`
	query ActiveGrades {
		ActiveGrades {
			id
			name
		}
	}
`;
