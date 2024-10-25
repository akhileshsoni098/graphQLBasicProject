const { buildSchema } = require("graphql");
// User is extracted from the UserSchema 
const schemaBlog = `
    type Blog {
    id:ID!
    userId:User!  
    title:String!
    description:String!
    }

    extend type Query {
    getBlog(id:ID!): Blog
    myBlogs: [Blog]
    getBlogs: [Blog]
    }

    extend type Mutation {
    createBlog(title: String!, description: String!):Blog
    updateBlog( id:ID!, title: String, description: String):Blog
    deleteBlog(id:ID!): String!
    }

    `;

module.exports = schemaBlog;
