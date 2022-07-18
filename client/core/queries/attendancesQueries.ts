export const GET_PAGINATED_STUDENT_ATTENDANCES = `
    query PaginatedAttendances($studentId: String!, $myCursor: String, $orderByKey: String, $orderDirection: String, $size: Int, $skip: Int) {
        PaginatedAttendances(studentId: $studentId, myCursor: $myCursor, orderByKey: $orderByKey, orderDirection: $orderDirection, size: $size, skip: $skip) {
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
