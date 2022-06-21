export const ADD_GROUP_MUTATION = `
mutation Mutation($name: String!, $startAt: String, $endAt: String, $gradeId: String) {
    createGroup(name: $name, startAt: $startAt, endAt: $endAt, gradeId: $gradeId) {
        id
    }
}
`;
