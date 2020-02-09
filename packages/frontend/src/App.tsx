import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Layout, Auth, Exercises, Editor } from 'pages'

const history = createBrowserHistory()

const App = () => {
  const logout = () => {
    //client.resetStore()
    localStorage.removeItem('editor_auth-token')
    history.push('/auth')
  }

  return (
    <Router history={history}>
      <Layout logout={() => logout()}>
        <Switch>
          <Route
            path="/auth"
            exact
            render={props => (
              <Auth onLogin={() => history.push('/')} {...props} />
            )}
          />
          <Route
            path="/"
            exact
            render={props => (
              <Exercises {...props} />
            )}
          />
          <Route
            path="/:exercise"
            exact
            render={props => (
              <Editor {...props} />
            )}
          />
        </Switch>
        <Redirect from="*" to="/" />
      </Layout>
    </Router>
  )
}

export default App