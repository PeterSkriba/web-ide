import gql from 'graphql-tag'

export default gql`
  query me {
    me {
      id
      isAuthor
      username
      first_name
      last_name
      email
    }
  }
`
