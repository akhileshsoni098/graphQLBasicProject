/* const { buildSchema } = require("graphql");
const userSchema = require("./graphQlUserSchema");
const schemaBlog = require("./graphQlBlogSchema");


const schemaMerger = buildSchema(`
${userSchema}
${schemaBlog}

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

    `);

module.exports = schemaMerger;
 */


const { makeExecutableSchema } = require("@graphql-tools/schema"); // Updated import
const userSchema = require("./graphQlUserSchema");
const schemaBlog = require("./graphQlBlogSchema");

const typeDefs = `
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
  }
  
  ${userSchema}
`; 

const schemaMerger = makeExecutableSchema({ typeDefs });

module.exports = schemaMerger;
