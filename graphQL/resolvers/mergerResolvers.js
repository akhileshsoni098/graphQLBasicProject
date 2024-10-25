const resolversBlog = require("./graphQlBlogResolver");
const resolversUser = require("./graphQlUserResolvers");

const mergeResolvers = {
   ...resolversUser,
   ...resolversBlog

}

module.exports = mergeResolvers;