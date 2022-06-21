export const ADD_GRADE_MUTATION = `
	mutation CreateGrade($name: String!) {
		createGrade(name: $name) {
			isActive
			name
		}
	}
`;
