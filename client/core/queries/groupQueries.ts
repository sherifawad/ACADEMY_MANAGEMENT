import { gql } from "@apollo/client";

export const GROUPS_QUERY = `
	query Groups {
		Groups {
			isActive
			name
		}
	}
`;
