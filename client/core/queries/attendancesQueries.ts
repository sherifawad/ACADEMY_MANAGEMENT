export const GET_PAGINATED_STUDENT_ATTENDANCES = `
    query Attendances($studentId: String!, $cursor: String, $orderBy: String, $orderDirection: String, $size: Int, $buttonNum: Int) {
        PaginatedAttendances(studentId: $studentId, cursor: $cursor, orderBy: $orderBy, orderDirection: $orderDirection, size: $size, buttonNum: $buttonNum) {
        pageEdges {
            cursor
            node {
                note
                id
                startAt
                endAt
            }
        }
        pageCursors {
            first {
                cursor
                page
                isCurrent
            }
            previous {
                cursor
                page
                isCurrent
            }
            around {
                cursor
                page
                isCurrent
            }
            next {
                cursor
                page
                isCurrent
            }
            last {
                cursor
                page
                isCurrent
            }
        }
            totalCount
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
