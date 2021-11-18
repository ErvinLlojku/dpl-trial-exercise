const merge = require("lodash.merge");
const { resolvers } = require('graphql-scalars');

const myResolvers = {
  Query: {
    // returns the birthday
    getBirthday: (_, __, { dataSources }) => {
      return dataSources.db.getBirthday();
    }
  },
  Mutation: {
    // updates the birthday
    setBirthday: async (_, args, { dataSources }) => {
      try {
        const response = await dataSources.db.setBirthday(args.birthday);
        return {
          code: 200,
          success: true,
          message: "Birthday was updated successfully!",
          birthday: args.birthday
        };
      } catch (error) {
        return {
          code: 400,
          success: false,
          message: "There was an error while updating the birthday",
          birthday: null
        };
      }
    }
  }
};

module.exports = merge(myResolvers, resolvers);
