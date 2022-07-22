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

export const GROUPS_IDS_QUERY = `
    query Groups {
        Groups {
            id
            name
        }
    }
`;

export const GROUP_NAME_QUERY = `
    query Group($groupId: String!) {
        Group(id: $groupId) {
            name
        }
    }
`;
