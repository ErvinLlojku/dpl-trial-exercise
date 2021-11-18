// Configure .env files
require('dotenv').config()

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./scheme");
const resolvers = require('./resolvers');

const MyDatabase = require("./db");

const db = new MyDatabase({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db })
});

server.listen({ port: 5000 }).then(() => {
  console.log(`
    🚀 Server is running!
    📡 Listening on port 5000
  `);
});
