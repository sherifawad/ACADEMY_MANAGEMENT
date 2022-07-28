import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { examMutationVariables } from "./examTypes";

export const CREATE_EXAM_MUTATION = `
    mutation Mutation($profileId: String!, $score: Float!, $date: DateTime!, $note: String) {
        createExam(profileId: $profileId, score: $score, date: $date, note: $note) {
            id
        }
    }
`;

export const createExamMutation = (variables: examMutationVariables) =>
	useMutation(
		"AddExam",
		() => createAxiosService(CREATE_EXAM_MUTATION, variables).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Exam Created Successfully");
			},
		}
	);
