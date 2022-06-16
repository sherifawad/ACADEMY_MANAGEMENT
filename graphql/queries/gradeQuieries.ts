import { gql } from "@apollo/client";

export const GRADES_QUERY = gql`
	query Grades {
		Grades {
			isActive
			name
		}
	}
`;
