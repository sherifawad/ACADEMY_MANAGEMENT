import { gql } from "@apollo/client";

export const GRADES_QUERY = `
	query Grades {
		Grades {
			isActive
			name
		}
	}
`;

export const ACTIVE_GRADES_QUERY = `
	query ActiveGrades {
		ActiveGrades {
			id
			name
		}
	}
`;
