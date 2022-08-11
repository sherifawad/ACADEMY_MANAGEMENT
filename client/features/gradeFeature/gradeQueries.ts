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

export const getGradeIds = async () => {
	try {
		const {
			data: {
				data: { Grades },
			},
		} = await createAxiosService(GRADES_IDS);
		return { Grades };
	} catch (error) {
		return {};
	}
};
export const getGradeGroups = async (variables: gradeVariables) => {
	try {
		const {
			data: {
				data: { Grade },
			},
		} = await createAxiosService(GRADE_GROUPS_QUERY, variables);
		return { ...Grade };
	} catch (error) {
		return {};
	}
};
