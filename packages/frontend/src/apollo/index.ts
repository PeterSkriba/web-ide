import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
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