import gql from 'graphql-tag'

export default gql`
  query exercise($slug: String!) {
    exercise(slug: $slug) {
      id
      title
      body
      slug
      description
      stdin
      stdout
    }
  }
`