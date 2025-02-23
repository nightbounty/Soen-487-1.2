const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");

// Define schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
  },
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log("Server ready at http://localhost:4000/graphql")
  );
}

startServer();
