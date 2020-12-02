import { gql } from '@apollo/client';

const CLASSES_UPDATE_CLASS_MUTATION = gql`
  mutation ClassesUpdateClassMutation($input: updateClassGroupInput!) {
    updateClassGroup(input: $input) {
      classGroup {
        id
        year
        section
      }
    }
  }
`;

export default CLASSES_UPDATE_CLASS_MUTATION;
