import { gql } from '@apollo/client';

const SUBJECTS_DELETE_SUBJECT_TYPE_MUTATION = gql`
  mutation SubjectsDeleteSubjectTypeMutation($input: deleteSubjectTypeInput!) {
    deleteSubjectType(input: $input) {
      subjectType {
        id
      }
    }
  }
`;

export default SUBJECTS_DELETE_SUBJECT_TYPE_MUTATION;
