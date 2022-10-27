import { createAxiosService } from "core/utils";
import { useMutation } from "@tanstack/react-query";
import { attendanceMutationVariables } from "./attendancesTypes";

export const CREATE_ATTENDANCE_MUTATION = `
    mutation Mutation($startAt: DateTime!, $profileId: String!, $note: String, $endAt: DateTime) {
        createAttendance(startAt: $startAt, profileId: $profileId, note: $note, endAt: $endAt) {
            id
            note
            startAt
            endAt
        }
    }
`;

export const CREATE_MULTIPLE_ATTENDANCE_MUTATION = `
    mutation CreateMultipleAttendance($startAt: DateTime!, $profileIds: [String!]!, $endAt: DateTime, $note: String) {
        createMultipleAttendance(startAt: $startAt, profileIds: $profileIds, endAt: $endAt, note: $note) {
        count
        }
    }
`;

export const UPDATE_ATTENDANCE_MUTATION = `
    mutation Mutation($updateAttendanceId: String!, $startAt: DateTime, $endAt: DateTime, $note: String) {
        updateAttendance(id: $updateAttendanceId, startAt: $startAt, endAt: $endAt, note: $note) {
            id
        }
    }
`;

export const UPDATE_MULTIPLE_ATTENDANCE_MUTATION = `
    mutation UpdateMultipleAttendance($startAtCondition: DateTime!, $profileIds: [String!]!, $endAtCondition: DateTime, $noteCondition: String, $startAt: DateTime, $endAt: DateTime, $note: String) {
        updateMultipleAttendance(startAtCondition: $startAtCondition, profileIds: $profileIds, endAtCondition: $endAtCondition, noteCondition: $noteCondition, startAt: $startAt, endAt: $endAt, note: $note) {
            count
        }
    }
`;

export const createAttendanceMutation = (variables: attendanceMutationVariables, token = null) =>
	useMutation(
		"AddAttendance",
		() =>
			createAxiosService({ query: CREATE_ATTENDANCE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Attendance Created Successfully");
			},
		}
	);

export const createMultipleAttendanceMutation = (variables: attendanceMutationVariables, token = null) =>
	useMutation(
		"AddMultipleAttendance",
		() =>
			createAxiosService({ query: CREATE_MULTIPLE_ATTENDANCE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Attendances Created Successfully");
			},
		}
	);

export const updateAttendanceMutation = (variables: attendanceMutationVariables, token = null) =>
	useMutation(
		"UpdateAttendance",
		() =>
			createAxiosService({ query: UPDATE_ATTENDANCE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Attendance Updated Successfully");
			},
		}
	);

export const updateMultipleAttendanceMutation = (variables: attendanceMutationVariables, token = null) =>
	useMutation(
		"UpdateMultipleAttendance",
		() =>
			createAxiosService({ query: UPDATE_MULTIPLE_ATTENDANCE_MUTATION, variables, token }).then(
				(response) => response.data.data
			),
		{
			onSuccess: () => {
				console.log("Attendances Updated Successfully");
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
