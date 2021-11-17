const { ApolloServer } = require("apollo-server");
const typeDefs = require("./scheme");

const server = new ApolloServer({ typeDefs, mocks: true })

server.listen({ port: 5000 }).then(() => {
  console.log(`
    🚀 Server is running!
    📡 Listening on port 5000
  `);
});
