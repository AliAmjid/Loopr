import { gql } from '@apollo/client';

const SCHOOL_PERIODS_SCHOOL_PERIODS_QUERY = gql`
  query SchollPeriodsSchollPeriodsQuery(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $quarter: Int
    $schoolYear: Int
  ) {
    schoolPeriods(
      first: $first
      last: $last
      before: $before
      after: $after
      quarter: $quarter
      schoolYear: $schoolYear
    ) {
      edges {
        node {
          id
          from
          to
          quarter
          schoolYear
        }
        cursor
      }
      totalCount
    }
  }
`;

export default SCHOOL_PERIODS_SCHOOL_PERIODS_QUERY;
