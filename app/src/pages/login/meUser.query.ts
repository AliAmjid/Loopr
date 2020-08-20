import { gql } from 'apollo-boost';

const meUserQuery = gql`
  {
    meUser {
      id
      name
    }
  }
`;

export interface MeUserQuery {
  meUser: {
    id: number;
  };
}

export default meUserQuery;
