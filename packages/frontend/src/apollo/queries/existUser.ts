import gql from 'graphql-tag'

export default gql`
  query existUser($email: String!) {
    existUser(email: $email)
  }
`
