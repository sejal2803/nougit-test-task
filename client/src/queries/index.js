import { gql } from 'apollo-boost'

export const FETCH_ENTRIES = gql`
  query GetEntries($first: Int!, $offset: Int!, $query: String) {
    getEntries(first: $first, offset: $offset, query: $query) {
      id
      author {
        name
        picture
        score
      }
      date
      popularity
      isTrending
      title
      description
      numComments
      thumbnail
      codeSubmissionTotal
      pledgeTotal
      pledgeGoal
      pledgerCount
      status
    }
  }
`
