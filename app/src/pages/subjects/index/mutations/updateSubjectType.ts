import { gql } from '@apollo/client';

const SUBJECTS_UPDATE_SUBJECT_TYPE_MUTATION = gql`
  mutation SubjectsUpdateSubjectTypeMutation($input: updateSubjectTypeInput!) {
    updateSubjectType(input: $input) {
      subjectType {
        id
        name
      }
    }
  }
`;

export default SUBJECTS_UPDATE_SUBJECT_TYPE_MUTATION;
