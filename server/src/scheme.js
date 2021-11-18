const { gql } = require("apollo-server");
const { typeDefs } = require('graphql-scalars');

const myTypeDefs = gql`
  type Mutation {
    "Mutatio to update birthday value"
    setBirthday(birthday: Date!): Birthday
  }

  type Query {
    "Query to return the birthday"
    getBirthday: Birthday
  }

  type Birthday {
   "Birthday in format: yyyy-mm-dd"
    birthday: Date!
  }
`;

module.exports = [
  myTypeDefs,
  ...typeDefs
];
