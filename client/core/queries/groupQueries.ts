import { gql } from "@apollo/client";

export const GROUPS_QUERY = gql`
	query Groups {
		Groups {
			isActive
			name
		}
	}
`;
