import gql from 'graphql-tag'

export default gql`
  mutation runCodeBody($data: runCodeBodyInput!) {
    runCodeBody(data: $data) {
      output
      log
      exitCode
    }
  }
`
