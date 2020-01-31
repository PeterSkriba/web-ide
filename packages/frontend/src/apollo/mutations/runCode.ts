import gql from 'graphql-tag'

export default gql`
  mutation runCode($code_id: ID!, $test_no: Int!, $test_body: String!) {
    runCode(code_id: $code_id, test_no: $test_no, test_body: $test_body) {
      output
      log
      exitCode
    }
  }
`