import gql from 'graphql-tag'

export default gql`
  query codeOwn($user_id: ID!, $exercise_slug: String!) {
    codeOwn(user_id: $user_id, exercise_slug: $exercise_slug) {
      id
      body
      tests
      exercise {
        id
        title
        body
        description
        slug
        stdin
        stdout
      }
    }
  }
`
