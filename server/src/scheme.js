const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query to return the birthday"
    getBirthday: Birthday
  }

  type Birthday {
    day: Int!
    month: Int!
    year: Int!
  }
`;

module.exports = typeDefs;
