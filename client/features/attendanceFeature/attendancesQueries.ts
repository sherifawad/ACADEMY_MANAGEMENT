import { createAxiosService } from "core/utils";
import { attendanceMutationVariables } from "./attendancesTypes";

export const GET_PAGINATED_STUDENT_ATTENDANCES = `
    query StudentAttendances($studentId: String!, $data: PaginationInputType) {
        studentAttendances(studentId: $studentId, data: $data) {
            list {
                id
                note
                startAt
                endAt
            }
            prevCursor
            nextCursor
            totalCount {
                _count
            }
        }
    }
`;

export const GET_STUDENT_ATTENDANCES = `
    query Attendances($studentId: String!, $take: Int) {
        Attendances(studentId: $studentId, take: $take) {
            note
            id
            startAt
            endAt
        }
    }
`;

export const studentAttendancesQuery = async (variable: attendanceMutationVariables) => {
	const {
		data: {
			data: {
				studentAttendances: { list, nextCursor, prevCursor, totalCount },
			},
		},
	} = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, variable);
	if (totalCount) {
		const { _count } = totalCount;
		return { list, nextCursor, prevCursor, _count };
	} else {
		return { list, prevCursor, nextCursor };
	}
};