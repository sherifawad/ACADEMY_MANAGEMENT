import { gql } from "@apollo/client";

export const GROUPS_QUERY = gql`
	query Grades {
		Grades {
			isActive
			name
		}
	}
`;
