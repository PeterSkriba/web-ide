import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import client from 'apollo'
import App from './App'

import 'styles/global.css'

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)