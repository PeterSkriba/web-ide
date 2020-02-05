import gql from 'graphql-tag'

export default gql`
  mutation register($data: createUserInput!) {
    register(data: $data) {
      token
      user {
        id
        username
        first_name
        last_name
        email
      }
    }
  }
`