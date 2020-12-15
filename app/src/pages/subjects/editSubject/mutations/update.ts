import { gql } from '@apollo/client';

const SUBJECTS_EDIT_SUBJECT_UPDATE_SUBJECT_MUTATION = gql`
  mutation SubjectsEditSubjectUpdateSubjectMutation($input: editSubjectInput!) {
    editSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_EDIT_SUBJECT_UPDATE_SUBJECT_MUTATION;
