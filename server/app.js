const express = require('express')
const graphqlHTTP = require('express-graphql')
const PORT = process.env.PORT || 4000
const db = require('./config/db')
const schema = require('./schema')
const resolver = require('./resolver')
const Utils = require('./utils')
const cors = require('cors')

const app = express()

app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
)

app.listen(PORT)

Utils.populateDB()

console.log('Running a GraphQL API server at localhost:4000/graphql')
