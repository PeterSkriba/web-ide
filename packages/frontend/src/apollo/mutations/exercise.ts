import gql from 'graphql-tag'

export default gql`
  mutation createExercise($data: createExerciseInput!) {
    createExercise(data: $data) {
      id
      slug
    }
  }
`
