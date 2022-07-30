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
export const CREATE_Multiple_EXAM_MUTATION = `
    mutation Mutation($date: DateTime!, $studentsAndScores: JSONObject, $score: Float, $note: String, $profileIds: [String!]) {
        createMultipleExam(date: $date, studentsAndScores: $studentsAndScores, score: $score, note: $note, profileIds: $profileIds) {
            count
        }
    }
`;
export const UPDATE_EXAM_MUTATION = `
    mutation Mutation($updateExamId: String!, $score: Float, $date: DateTime, $note: String) {
        updateExam(id: $updateExamId, score: $score, date: $date, note: $note) {
            id
            note
            score
            date
        }
    }
`;
export const UPDATE_Multiple_EXAM_MUTATION = `
    mutation UpdateMultipleExam($dateCondition: DateTime!, $profileIds: [String!]!, $noteCondition: DateTime, $scoreCondition: Float, $score: Float, $date: DateTime, $note: String) {
        updateMultipleExam(dateCondition: $dateCondition, profileIds: $profileIds, noteCondition: $noteCondition, scoreCondition: $scoreCondition, score: $score, date: $date, note: $note) {
            count
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

export const createMultipleExamMutation = (variables: examMutationVariables) =>
	useMutation(
		"AddMultipleExams",
		() =>
			createAxiosService(CREATE_Multiple_EXAM_MUTATION, variables).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Exams Created Successfully");
			},
		}
	);

export const updateExamMutation = (variables: examMutationVariables) =>
	useMutation(
		"UpdateExam",
		() => createAxiosService(UPDATE_EXAM_MUTATION, variables).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Exam Updated Successfully");
			},
		}
	);

export const updateMultipleExamMutation = (variables: examMutationVariables) =>
	useMutation(
		"UpdateMultipleExams",
		() =>
			createAxiosService(UPDATE_Multiple_EXAM_MUTATION, variables).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Exams Updated Successfully");
			},
		}
	);
