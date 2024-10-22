const { GraphQLSchema } = require("graphql");
const { rootQuery, rootMutation } = require("./artistControllers/artistControllers");

// Export the GraphQL Schema
module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
  });