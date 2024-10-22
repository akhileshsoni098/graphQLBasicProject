require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const merge = require("./graphQl/merge")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
 

app.use(
    "/graphql",                            // Path to expose GraphQL
    graphqlHTTP({                          // Setup GraphQL server
      schema:merge,               // Define the structure of your GraphQL API
      graphiql: true,  
      darkMode:true                    // Enable GraphiQL tool for interactive API exploration
    })
  );

mongoose.connect(process.env.MONGODB_URL_LOCAL)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
