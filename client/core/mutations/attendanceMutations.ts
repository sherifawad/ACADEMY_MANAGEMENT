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
    mutation CreateMultipleAttendance($startAtCondition: DateTime!, $profileIds: [String!]!, $note: String, $endAt: DateTime, $startAt: DateTime, $noteCondition: String, $endAtCondition: DateTime) {
        updateMultipleAttendance(startAtCondition: $startAtCondition, profileIds: $profileIds, note: $note, endAt: $endAt, startAt: $startAt, noteCondition: $noteCondition, endAtCondition: $endAtCondition) {
            count
        }
    }
`;
