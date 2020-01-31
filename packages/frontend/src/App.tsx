import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Layout, Editor } from 'pages'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        <Route path="/" exact component={Editor} />
        <Redirect from="*" to="/" />
      </Switch>
    </Layout>
  </Router>
)

export default App