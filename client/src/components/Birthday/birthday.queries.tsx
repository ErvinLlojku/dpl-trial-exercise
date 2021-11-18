import { gql } from "@apollo/client";

/**
 * Query used to retrieve the birthday
 */
export const GET_BIRTHDAY = gql`
  query Query {
    getBirthday {
      birthday
    }
  }
`;

/**
 * Mutation used to update birthday value
 */
export const UPDATE_BIRTHDAY = gql`
  mutation SetBirthday($birthday: String!) {
    setBirthday(birthday: $birthday) {
      code
      success
      message
      birthday
    }
  }
`;
