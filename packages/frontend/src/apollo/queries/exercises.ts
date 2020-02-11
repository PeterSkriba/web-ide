import gql from 'graphql-tag'

export default gql`
  query exercises {
    exercises {
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
