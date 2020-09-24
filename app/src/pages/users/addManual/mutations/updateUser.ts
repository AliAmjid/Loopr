import { gql } from '@apollo/client';

const USERS_ADD_MANUAL_UPDATE_USER = gql`
mutation UsersAddManualUpdateUser($input:updateUserInput!){
    updateUser(input:$input){
        
    }
}`;
