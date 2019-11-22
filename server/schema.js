const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  scalar Date

  type Author {
    name: String
    picture: String
    score: Float
  }

  type SocialEntry {
    id: ID!
    author: Author
    date: Date
    popularity: Float
    isTrending: Boolean
    title: String
    description: String
    numComments: Int
    thumbnail: String
    codeSubmissionTotal: Int
    pledgeTotal: Float
    pledgeGoal: Float
    pledgerCount: Int
    status: Int
  }

  type Query {
    getEntries(first: Int, offset: Int, query: String): [SocialEntry]
  }
`)

module.exports = schema
