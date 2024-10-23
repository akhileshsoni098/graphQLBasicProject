// public call dotenv this is root

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const graphQlSchema = require('./graphQL/schema/graphQlUserSchema');
const graphQlResolvers = require('./graphQL/resolvers/graphQlUserResolvers');
const app = express();

app.use(express.json());

app.use(cors());




mongoose.connect(process.env.MONGODB_URL_LOCAL)
 .then(() => console.log('MongoDB connected successfully'))
 .catch(err => console.error(err));


app.use("/",
    graphqlHTTP({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
    })
  );



 const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
  });




