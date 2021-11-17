const { ApolloServer } = require("apollo-server");
const typeDefs = require("./scheme");

const mocks = {
  Birthday: () => ({
    day: () => 13,
    month: () => 6,
    year: () => 2021
  })
};

const server = new ApolloServer({ typeDefs, mocks })

server.listen({ port: 5000 }).then(() => {
  console.log(`
    🚀 Server is running!
    📡 Listening on port 5000
  `);
});
