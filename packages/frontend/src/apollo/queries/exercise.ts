import gql from 'graphql-tag'

export default gql`
  query exercise($title: String!) {
    exercise(title: $title) {
      id
      title
      body
      description
      stdin
      stdout
    }
  }
`