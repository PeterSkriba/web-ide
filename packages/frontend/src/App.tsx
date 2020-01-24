import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Editor } from 'pages'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Editor} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
)

export default App