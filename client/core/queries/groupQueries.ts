export const GROUPS_QUERY = `
	query Groups {
		Groups {
            id
            isActive
            name
            startAt
            endAt
            grade {
                id
                name
            }
		}
	}
`;
