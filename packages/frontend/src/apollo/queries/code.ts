import gql from 'graphql-tag'

export default gql`
  query code($user_id: ID!, $exercise_id: ID!) {
    code(user_id: $user_id, exercise_id: $exercise_id) {
      body
      tests
    }
  }
`