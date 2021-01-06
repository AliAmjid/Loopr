import { gql } from '@apollo/client';

const SCHOOL_PERIODS_SCHOOL_PERIODS_QUERY = gql`
  query SchollPeriodsSchollPeriodsQuery(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    schoolPeriods(first: $first, last: $last, before: $before, after: $after) {
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
