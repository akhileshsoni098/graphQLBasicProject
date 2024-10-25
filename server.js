require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema"); // Updated import
const schemaMerger = require("./graphQL/schema/mergeSchema"); // typeDefs
const mergeResolvers = require("./graphQL/resolvers/mergerResolvers"); // resolvers
const jwt = require("jsonwebtoken");
const User = require("./model/userModel");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL_LOCAL,)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up GraphQL schema
const schema = makeExecutableSchema({
  typeDefs: schemaMerger,
  resolvers: mergeResolvers,
});

app.use(
  "/",
  graphqlHTTP(async (req) => {
    let context = {};
    const token = req.headers["x-auth-token"];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded._id);

        if (user) {
          context = {
            user: {
              _id: user._id,
              role: user.role,
              name: user.name,
              email: user.email,
            },
          };
        }
      } catch (err) {
        console.log("Token verification failed:", err.message);
      }
    }

    return {
      schema,
      graphiql: true,
      context,
    };
  })
);
  

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
