import gql from 'graphql-tag'

export default gql`
  mutation updateCode($data: updateCodeDataInput!, $where: updateCodeWhereInput!) {
    updateCode(data: $data, where: $where) {
      body
      tests
    }
  }
`