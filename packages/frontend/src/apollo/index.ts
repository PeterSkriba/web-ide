import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: operation => {
    const token = localStorage.getItem('editor_auth-token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

export default client
