import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_MUTATION = gql`
  mutation SubjectsAddSubjectTypeMutation($input: createSubjectTypeInput!) {
    createSubjectType(input: $input) {
      subjectType {
        id
      }
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_MUTATION;
