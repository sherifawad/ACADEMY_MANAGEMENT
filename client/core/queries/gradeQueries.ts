export const GRADES_QUERY = `
    query Query {
        Grades {
            id
            isActive
            name
        }
    }
`;
export const GRADES_IDS = `
    query Query {
        Grades {
            id
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

export const GRADE_GROUPS_QUERY = `
    query Grade($gradeId: String!) {
        Grade(id: $gradeId) {
            name
            groups {
                id
                isActive
                name
                startAt
                endAt
                grade {
                    id
                }
            }
        }
    }
`;
