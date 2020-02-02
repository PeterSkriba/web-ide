import gql from 'graphql-tag'

// https://www.prisma.io/tutorials/authentication-in-apollo-server-ct21

export default gql`
  mutation register($data: createUserInput!) {
    register(data: $data) {
      id
      username
      first_name
      last_name
      email
    }
  }
`