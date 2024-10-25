/* require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema"); // Updated import
const schemaMerger = require("./graphQL/schema/mergeSchema"); // typeDefs
const mergeResolvers = require("./graphQL/resolvers/mergerResolvers"); // resolvers
const jwt = require("jsonwebtoken");
const User = require("./model/userModel");
const { authentication } = require("./middi/auth");

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
    const context = await authentication(req)
    return {
      schema,
      context,
    };
  })
);




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const schemaMerger = require("./graphQL/schema/mergeSchema"); 
const mergeResolvers = require("./graphQL/resolvers/mergerResolvers"); 
const { authentication } = require("./middi/auth");
const expressPlayground = require("graphql-playground-middleware-express").default;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL_LOCAL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up GraphQL schema
const schema = makeExecutableSchema({
  typeDefs: schemaMerger,
  resolvers: mergeResolvers,
});

// Set up GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP(async (req) => {
    const context = await authentication(req); // Using authentication to set context
    return {
      schema,
      graphiql: false, // Disable default GraphiQL for /graphql
      context,
    };
  })
);

// Set up GraphQL Playground at /playground
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`GraphQL Playground available at http://localhost:${port}/playground`);
});
