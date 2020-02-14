import gql from 'graphql-tag'

export default gql`
  query existExercise($title: String!) {
    existExercise(title: $title)
  }
`
