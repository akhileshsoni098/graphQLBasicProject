const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
      id: ID!
      name: String!
      email: String!
      password: String!
    }

    type Query {
      getUser(id: ID, name: String, email: String): User
      getUsers: [User]
    }

    type Mutation {
      createUser(name: String!, email: String!, password: String!): User
      updateUser(id: ID!, name: String): User
      deleteUser(id: ID!): User
    }
`);

module.exports = schema;
