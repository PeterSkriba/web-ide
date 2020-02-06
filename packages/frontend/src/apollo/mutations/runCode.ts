import gql from 'graphql-tag'

export default gql`
  mutation runCode($where: runCodeWhereInput!) {
    runCode(where: $where) {
      output
      log
      exitCode
    }
  }
`