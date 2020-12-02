import { gql } from '@apollo/client';

const CLASSES_ADD_CLASS_MUTATION = gql`
  mutation ClassesAddClassMutation($input: createClassGroupInput!) {
    createClassGroup(input: $input) {
      classGroup {
        id
      }
    }
  }
`;

export default CLASSES_ADD_CLASS_MUTATION;
