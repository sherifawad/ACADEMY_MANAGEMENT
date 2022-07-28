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

export const studentExamsQuery = async (variable: examMutationVariables) => {
	const {
		data: {
			data: {
				SExams: { list },
			},
		},
	} = await createAxiosService(GET_STUDENT_EXAMS, variable);
	return { list };
};
