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

export const GRADE_GROUPS_QUERY = `
    query Query($gradeId: String!) {
        Grade(id: $gradeId) {
            groups {
                id
                name
            }
        }
    }
`;
