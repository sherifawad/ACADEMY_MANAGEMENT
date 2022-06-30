export const GET_STUDENT_EXAMS = `
    query UserExams($studentId: String!) {
        UserExams(studentId: $studentId) {
            id
            score
            date
        }
    }
`;
