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
    name: string;
  };
}

export default meUserQuery;
