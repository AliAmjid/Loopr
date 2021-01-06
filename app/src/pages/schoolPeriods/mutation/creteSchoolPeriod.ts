import { gql } from '@apollo/client';

const SCHOOL_PERIODS_CREATE_SCHOOL_PERIOD_MUTATION = gql`
  mutation SchoolPeriodsCreateSchoolPeriodMutation(
    $input: createSchoolPeriodInput!
  ) {
    createSchoolPeriod(input: $input) {
      schoolPeriod {
        id
      }
    }
  }
`;

export default SCHOOL_PERIODS_CREATE_SCHOOL_PERIOD_MUTATION;
