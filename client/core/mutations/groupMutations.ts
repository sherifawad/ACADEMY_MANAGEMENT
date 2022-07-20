export const ADD_GROUP_MUTATION = `
    mutation Mutation($name: String!, $startAt: DateTime, $endAt: DateTime, $isActive: Boolean, $gradeId: String) {
        createGroup(name: $name, startAt: $startAt, endAt: $endAt, isActive: $isActive, gradeId: $gradeId) {
            id
        }
    }
`;
export const UPDATE_GROUP_MUTATION = `
    mutation UpdateGroup($updateGroupId: String!, $name: String, $startAt: DateTime, $endAt: DateTime, $isActive: Boolean, $gradeId: String) {
        updateGroup(id: $updateGroupId, name: $name, startAt: $startAt, endAt: $endAt, isActive: $isActive, gradeId: $gradeId) {
            id
        }
    }
`;
