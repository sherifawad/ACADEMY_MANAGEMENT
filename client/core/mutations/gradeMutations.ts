export const ADD_GRADE_MUTATION = `
    mutation CreateGrade($name: String!, $isActive: Boolean!) {
        createGrade(name: $name, isActive: $isActive) {
            id
            isActive
            name
        }
    }
`;
export const UPDATE_GRADE_MUTATION = `
    mutation UpdateGrade($updateGradeId: String!, $isActive: Boolean!, $name: String!) {
        updateGrade(id: $updateGradeId, isActive: $isActive, name: $name) {
            id
        }
    }
`;
