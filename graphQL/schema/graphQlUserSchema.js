const userSchema = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  extend type Query {
    getUser: User
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    logInUser(email: String!, password: String!): Auth
    updateUser(name: String): User
    deleteUser: String!
  }
`;

module.exports = userSchema;
