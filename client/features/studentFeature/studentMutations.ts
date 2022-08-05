import { createAxiosService } from "core/utils";
import { useMutation } from "react-query";
import { studentMutationVariables } from "./studentTypes";

export const STUDENT_REGISTER_MUTATION = `
    mutation Mutation($email: String!, $password: String!, $address: String!, $phone: String!, $groupId: String!, $name: String, $parentsPhones: String) {
        studentRegister(email: $email, password: $password, address: $address, phone: $phone, groupId: $groupId, name: $name, parentsPhones: $parentsPhones) {
            id
        }
    }
`;

export const createStudentMutation = (variables: studentMutationVariables) =>
	useMutation(
		"AddStudent",
		() => createAxiosService(STUDENT_REGISTER_MUTATION, variables).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Student Created Successfully");
			},
		}
	);
