const { buildSchema } = require("graphql");

const schemaBlog = `
    type Blog {
    id:ID!
    userId:User!
    title:String!
    description:String!
    }

    extend type Query {
    getBlog(id: ID!,userId:ID!): Blog
    getBlogs(userId: ID!): [Blog]
    }

    extend type Mutation {
    createBlog(userId: ID!, title: String!, description: String!):Blog
    updateBlog( id:ID!,userId:ID! title: String, description: String):Blog
    deleteBlog(id:ID!, userId:ID!): Blog
    }

    `;

module.exports = schemaBlog;
