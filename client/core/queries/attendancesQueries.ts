export const GET_PAGINATED_STUDENT_ATTENDANCES = `
    query Query($studentId: String!) {
        Attendances(studentId: $studentId) {
            id
            note
            startAt
            endAt
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
