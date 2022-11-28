import { Variables } from "@/graphql/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createAxiosService } from "utils/axiosUtils";

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

export const createGradeMutation = (variables: Variables, token = null) =>
	useMutation(
		["AddGrade"],
		() =>
			createAxiosService({ query: ADD_GRADE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: (data) => {
				console.log("Grade Created Successfully");
				return { error: null, data };
			},
			onError: (error) => {
				if (typeof error === "string") {
					console.log(error.toUpperCase());
					return { error: error.toUpperCase() };
				} else if (error instanceof AxiosError) {
					console.log(error.message);
					return { error: error.message };
				}
				console.log(error);
				return { error };
			},
		}
	);

export const deleteGradeMutation = (variables: Variables, token = null) =>
	useMutation(
		["AddGrade"],
		() =>
			createAxiosService({ query: Delete_GRADE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: (data) => {
				console.log("Grade Created Successfully");
				return { error: null, data };
			},
			onError: (error) => {
				if (typeof error === "string") {
					console.log(error.toUpperCase());
					return { error: error.toUpperCase() };
				} else if (error instanceof AxiosError) {
					console.log(error.message);
					return { error: error.message };
				}
				console.log(error);
				return { error };
			},
		}
	);

export const updateGradeMutation = (variables: Variables, token = null) =>
	useMutation(
		["UpdateGrade"],
		() =>
			createAxiosService({ query: UPDATE_GRADE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: (data) => {
				console.log("Grade Updated Successfully");
				return { error: null, data };
			},
			onError: (error) => {
				if (typeof error === "string") {
					console.log(error.toUpperCase());
					return { error: error.toUpperCase() };
				} else if (error instanceof AxiosError) {
					console.log(error.message);
					return { error: error.message };
				}
				console.log(error);
				return { error };
			},
		}
	);
