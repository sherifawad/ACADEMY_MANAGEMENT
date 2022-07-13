export const GET_STUDENT_ATTENDANCES = `
    query Query($studentId: String!) {
        Attendances(studentId: $studentId) {
            id
            note
            startAt
            endAt
        }
    }
`;
