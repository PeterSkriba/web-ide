import gql from 'graphql-tag'

export default gql`
  query exercise($id: ID!) {
    exercise(id: $id) {
      title
      description
      stdin
      stdout
    }
  }
`