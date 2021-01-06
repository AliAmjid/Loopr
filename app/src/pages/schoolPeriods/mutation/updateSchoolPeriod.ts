import { gql } from '@apollo/client';

const SCHOOL_PERIODS_UPDATE_SCHOOL_PERIOD_MUTATION = gql`
  mutation SchoolPeriodsUpdateSchoolPeriodMutation(
    $input: updateSchoolPeriodInput!
  ) {
    updateSchoolPeriod(input: $input) {
      schoolPeriod {
        id
      }
    }
  }
`;

export default SCHOOL_PERIODS_UPDATE_SCHOOL_PERIOD_MUTATION;
