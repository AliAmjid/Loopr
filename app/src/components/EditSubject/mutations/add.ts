import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_ADD_MUTATION = gql`
  mutation SubjectsEditSubjectAddMutation($input: createSubjectInput!) {
    createSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_EDIT_SUBJECT_ADD_MUTATION;
