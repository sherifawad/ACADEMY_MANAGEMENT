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
export const UPDATE_ATTENDANCE_MUTATION = `
    mutation Mutation($updateAttendanceId: String!, $startAt: DateTime, $endAt: DateTime, $note: String) {
        updateAttendance(id: $updateAttendanceId, startAt: $startAt, endAt: $endAt, note: $note) {
            id
        }
    }
`;
