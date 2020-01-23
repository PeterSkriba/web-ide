import gql from 'graphql-tag'

export default gql`
  query code {
    code {
      body
      tests
    }
  }
`