
const userSchema =`
    type User {
      id: ID!
      name: String!
      email: String!
      password: String!
    }

     extend type Query {
      getUser(id: ID, name: String, email: String): User
      getUsers: [User]
    }

     extend type Mutation {
      createUser(name: String!, email: String!, password: String!): User
      updateUser(id: ID!, name: String): User
      deleteUser(id: ID!): User
    }
`

module.exports = userSchema;
