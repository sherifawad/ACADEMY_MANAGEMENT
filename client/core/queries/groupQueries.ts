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
export const GRADE_GROUPS_QUERY = `
    query Grade($gradeId: String!) {
        Grade(id: $gradeId) {
            groups {
                id
                isActive
                name
            }
        }
    }
`;
