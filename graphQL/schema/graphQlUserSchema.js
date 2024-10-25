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
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = userSchema;
