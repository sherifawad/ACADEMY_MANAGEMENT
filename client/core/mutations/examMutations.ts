export const CREATE_EXAM_MUTATION = `
    mutation Mutation($profileId: String!, $score: Float!, $date: DateTime!, $note: String) {
        createExam(profileId: $profileId, score: $score, date: $date, note: $note) {
            id
        }
    }
`;
