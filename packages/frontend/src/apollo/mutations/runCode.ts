import gql from 'graphql-tag'

export default gql`
  mutation runCode($code_id: ID!, $test_no: Int!) {
    runCode(code_id: $code_id, test_no: $test_no) {
      output
      log
      exitCode
    }
  }
`