import { gql } from '@apollo/client';

const SCHOOL_PERIODS_DELETE_SCHOOL_PERIOD_MUTATION = gql`
  mutation SchoolPeriodsDeleteSchoolPeriodMutation(
    $input: deleteSchoolPeriodInput!
  ) {
    deleteSchoolPeriod(input: $input) {
      schoolPeriod {
        id
      }
    }
  }
`;

export default SCHOOL_PERIODS_DELETE_SCHOOL_PERIOD_MUTATION;
