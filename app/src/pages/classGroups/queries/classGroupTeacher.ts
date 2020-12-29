import { gql } from '@apollo/client';

const CLASS_GROUPS_CLASS_GROUP_TEACHER = gql`
  query ClassGroupsClassGroupTeacher($id: ID!) {
    classGroup(id: $id) {
      teacher {
        id
        email
        firstname
        lastname
      }
    }
  }
`;

export default CLASS_GROUPS_CLASS_GROUP_TEACHER;
