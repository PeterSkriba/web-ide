import gql from 'graphql-tag'

export default gql`
  query codeOwn($user_id: ID!, $exercise_id: ID!) {
    codeOwn(user_id: $user_id, exercise_id: $exercise_id) {
      id
      body
      tests
    }
  }
`