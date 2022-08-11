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
export const UPDATE_GRADE_MUTATION = `
    mutation UpdateGrade($updateGradeId: String!, $isActive: Boolean!, $name: String!) {
        updateGrade(id: $updateGradeId, isActive: $isActive, name: $name) {
            id
        }
    }
`;

export const createGradeMutation = (variables: gradeVariables) =>
	useMutation(
		"AddGrade",
		() => createAxiosService(ADD_GRADE_MUTATION, variables).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Grade Created Successfully");
			},
		}
	);
export const updateGradeMutation = (variables: gradeVariables) =>
	useMutation(
		"UpdateGrade",
		() => createAxiosService(ADD_GRADE_MUTATION, variables).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Grade Updated Successfully");
			},
		}
	);
