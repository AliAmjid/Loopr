import { gql } from '@apollo/client';

const TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_UPDATE_PERCENT_TO_MARK_COVERT = gql`
  mutation TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert(
    $input: updatePercentToMarkConvertInput!
  ) {
    updatePercentToMarkConvert(input: $input) {
      percentToMarkConvert {
        id
      }
    }
  }
`;

export default TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_UPDATE_PERCENT_TO_MARK_COVERT;
