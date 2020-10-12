const express = require("express");
const schema = require('./schema/schema')
const { graphqlHTTP } = require("express-graphql");

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(3000, () => {
  console.log("Listen on port 3000");
});