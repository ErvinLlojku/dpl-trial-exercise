const merge = require("lodash.merge");
const { resolvers } = require('graphql-scalars');

const myResolvers = {
  Query: {
    // returns the birthday
    getBirthday: (_, __, { dataSources }) => {
      return dataSources.db.getBirthday();
    }
  }
};

module.exports = merge(myResolvers, resolvers);
