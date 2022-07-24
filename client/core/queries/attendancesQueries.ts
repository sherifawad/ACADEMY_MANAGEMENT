export const GET_PAGINATED_STUDENT_ATTENDANCES = `
    query StudentAttendances($studentId: String!, $data: PaginationInputType) {
        studentAttendances(studentId: $studentId, data: $data) {
            list {
                id
                note
                startAt
                endAt
            }
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
