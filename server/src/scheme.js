const { gql } = require("apollo-server");
const { typeDefs } = require('graphql-scalars');

const myTypeDefs = gql`
  type Mutation {
    "Mutatio to update birthday value"
    setBirthday(birthday: String!): SetBirthdayResponse!
  }

  type Query {
    "Query to return the birthday"
    getBirthday: Birthday
  }

  type Birthday {
   "Birthday in format: yyyy-mm-dd"
    birthday: String!
  }

  type SetBirthdayResponse {
    "Similar to HTTP codes, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successfull"
    success: Boolean!
    "Human readable message for the UI"
    message: String!
    "Updated value of the birthday after a successfull mutation"
    birthday: String
  }
`;

module.exports = [
  myTypeDefs,
  ...typeDefs
];
