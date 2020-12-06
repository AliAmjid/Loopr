import { gql } from '@apollo/client';

const SUBJECTS_ADD_SUBJECT_ADD_MUTATION = gql`
  mutation SubjectsAddSubjectAddMutation($input: createSubjectInput!) {
    createSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_ADD_SUBJECT_ADD_MUTATION;
