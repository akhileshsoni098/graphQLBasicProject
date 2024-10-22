const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
} = require("graphql");

const Artist = require("./models/artist");

// Artist Type Definition
const artistType = new GraphQLObjectType({
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
const artistInputType = new GraphQLInputObjectType({
  name: "ArtistInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    age: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const artistInputTypeUpdate = new GraphQLInputObjectType({
  name: "ArtistInputUpdate",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

// Mutation to Create Artist
const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createArtist: {
      type: artistType,
      args: {
        data: { type: artistInputType },
      },
      resolve: async (_, args) => {
        const { email, phone } = args.data;

        const existingEmail = await Artist.findOne({ email });
        if (existingEmail) {
          throw new Error("An artist with this email already exists.");
        }

        if (phone) {
          const existingPhone = await Artist.findOne({ phone });
          if (existingPhone) {
            throw new Error("An artist with this phone number already exists.");
          }
        }

        try {
          const newArtist = await Artist.create(args.data);
          if (!newArtist) {
            throw new Error("Artist creation failed.");
          }
          return newArtist;
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },

    // update
    updateArtist: {
      type: artistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(artistInputTypeUpdate) },
      },
      resolve: async (_, args) => {
        try {
          const updateArtist = await Artist.findByIdAndUpdate(
            args.id,
            { ...args.data },
            { new: true }
          );
          return updateArtist;
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
    },
    //delete
    deleteArtist: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },

      resolve: async (_, args) => {
        try {
          const deleteArtist = await Artist.findByIdAndDelete(args.id);
          if (deleteArtist) {
            return "Artist deleted successfully";
          }
          return "Artist not found";
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
    },
  },
});

// Query to Fetch All or a Single Artist
const rootQuery = new GraphQLObjectType({
  // get All
  name: "Query",
  fields: {
    artists: {
      type: new GraphQLList(artistType),
      resolve: async () => {
        try {
          return await Artist.find();
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
    },
    // get Single
    artistById: {
      type: artistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        try {
          return await Artist.findById(id);
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
    },
  },
});

// Export the GraphQL Schema
module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
