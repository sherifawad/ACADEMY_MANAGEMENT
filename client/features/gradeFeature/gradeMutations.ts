import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { gradeVariables } from "./gradeTypes";

export const ADD_GRADE_MUTATION = `
    mutation CreateGrade($name: String!, $isActive: Boolean!) {
        createGrade(name: $name, isActive: $isActive) {
            id
            isActive
            name
        }
    }
`;

export const Delete_GRADE_MUTATION = `
    mutation DeleteGrade($deleteGradeId: String!) {
        deleteGrade(id: $deleteGradeId) {
            id
        }
    }
`;
export const UPDATE_GRADE_MUTATION = `
    mutation UpdateGrade($updateGradeId: String!, $isActive: Boolean!, $name: String!) {
        updateGrade(id: $updateGradeId, isActive: $isActive, name: $name) {
            id
        }
    }
`;

export const createGradeMutation = (variables: gradeVariables, token = null) =>
	useMutation(
		"AddGrade",
		() =>
			createAxiosService({ query: ADD_GRADE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Grade Created Successfully");
			},
		}
	);

export const deleteGradeMutation = (variables: gradeVariables, token = null) =>
	useMutation(
		"AddGrade",
		() =>
			createAxiosService({ query: Delete_GRADE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Grade Created Successfully");
			},
		}
	);

export const updateGradeMutation = (variables: gradeVariables, token = null) =>
	useMutation(
		"UpdateGrade",
		() =>
			createAxiosService({ query: UPDATE_GRADE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Grade Updated Successfully");
			},
		}
	);
