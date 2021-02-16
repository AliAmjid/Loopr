import { gql } from '@apollo/client';

const SUBJECTS_ARCHIVE_SUBJECT_MUTATION = gql`
  mutation SubjectsARchiveSubjectMutation($input: archiveSubjectInput!) {
    archiveSubject(input: $input) {
      subject {
        id
      }
    }
  }
`;

export default SUBJECTS_ARCHIVE_SUBJECT_MUTATION;
