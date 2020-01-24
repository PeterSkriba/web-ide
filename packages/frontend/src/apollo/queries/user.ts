import gql from 'graphql-tag'

export default gql`
  query user($email: String!) {
    user(email: $email) {
      id
      username
      first_name
      last_name
      email
      password
    }
  }
`