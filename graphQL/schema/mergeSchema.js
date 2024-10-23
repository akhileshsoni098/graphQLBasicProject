const { buildSchema } = require("graphql");
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
