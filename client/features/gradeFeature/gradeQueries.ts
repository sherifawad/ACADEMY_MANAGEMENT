import { createAxiosService } from "core/utils";
import { gradeVariables } from "./gradeTypes";

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

export const getActiveGradesList = async (token = null) => {
	try {
		const {
			data: {
				data: { ActiveGrades },
			},
		} = await createAxiosService({ query: ACTIVE_GRADES_QUERY, token });
		return { grades: ActiveGrades, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};

export const getGradeList = async (token = null) => {
	try {
		const {
			data: {
				data: { Grades },
			},
		} = await createAxiosService({ query: GRADES_QUERY, token });
		return { Grades, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};

export const getGradeIds = async (token = null) => {
	try {
		const {
			data: {
				data: { Grades },
			},
		} = await createAxiosService({ query: GRADES_IDS, token });
		return { Grades, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
export const getGradeGroups = async (variables: gradeVariables, token = null) => {
	try {
		const {
			data: {
				data: { Grade },
			},
		} = await createAxiosService({ query: GRADE_GROUPS_QUERY, variables, token });
		return { ...Grade, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
