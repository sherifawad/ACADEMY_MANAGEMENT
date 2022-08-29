import { createAxiosService } from "core/utils";
import { examMutationVariables } from "./examTypes";

export const GET_STUDENT_EXAMS = `
    query Query($studentId: String!) {
        SExams(studentId: $studentId) {
            list {
                id
                note
                score
                date
            }
        }
    }
`;

export const studentExamsQuery = async (variables: examMutationVariables, token = null) => {
	try {
		const {
			data: {
				data: {
					SExams: { list },
				},
			},
		} = await createAxiosService({ query: GET_STUDENT_EXAMS, variables, token });
		return { list, error: null };
	} catch (error) {
		return {
			error: error.message,
		};
	}
};
