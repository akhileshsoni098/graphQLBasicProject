const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLInt,
  } = require("graphql");



  // Artist Type Definition
exports.artistType = new GraphQLObjectType({
    name: "Artist",
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: GraphQLString },
      age: { type: new GraphQLNonNull(GraphQLInt) },
    },
  });
  
  /// schema for creation
  exports.artistInputType = new GraphQLInputObjectType({
    name: "ArtistInput",
    fields: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: GraphQLString },
      age: { type: new GraphQLNonNull(GraphQLInt) },
    },
  });
  /// schema for updation 
  exports.artistInputTypeUpdate = new GraphQLInputObjectType({
    name: "ArtistInputUpdate",
    fields: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      age: { type: GraphQLInt },
    },
  });