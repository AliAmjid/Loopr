import { gql } from '@apollo/client';

const PROFILE_UPDATE_PERCENTS_TO_MARK_CONVERTER_MUTATION = gql`
  mutation ProfileUpdatePercentsToMarkConverterMutation(
    $input: updatePercentToMarkConvertInput!
  ) {
    updatePercentToMarkConvert(input: $input) {
      percentToMarkConvert {
        id
      }
    }
  }
`;

export default PROFILE_UPDATE_PERCENTS_TO_MARK_CONVERTER_MUTATION;
