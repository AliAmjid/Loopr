import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_ADD_MUTATION = gql`
  mutation SubjectsAddSubjectTypeAddMutation($input: createSubjectTypeInput!) {
    createSubjectType(input: $input) {
      subjectType {
        id
      }
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_ADD_MUTATION;
