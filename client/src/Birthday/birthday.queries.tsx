import { gql } from "@apollo/client";

export const GET_BIRTHDAY = gql`
  query Query {
    getBirthday {
      birthday
    }
  }
`;
