import React, { useState } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useQuery } from '@apollo/react-hooks'
//import { useDidUpdate } from 'react-hooks-lib'

import { Layout, Auth, Exercises, Editor } from 'pages'
import { ME } from 'apollo/queries'

const history = createBrowserHistory()

const App = () => {
  const { client, data, loading, refetch } = useQuery(ME)

  const logout = () => {
    client.resetStore()
    localStorage.removeItem('editor_auth-token')
    history.push('/')
  }

  return (
    <Router history={history}>
      <Layout
        logout={() => logout()}
        isLogged={!!data?.me}
      >

        {!!data?.me ? (
          <Switch>
            <Route
                path="/"
                exact
                render={props => (
                  <Exercises me={data} {...props} />
                )}
              />
              <Route
                path="/:exercise"
                exact
                render={props => (
                  <Editor me={data} {...props} />
                )}
              />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Auth onLogin={() => refetch()} {...props} />
              )}
            />
          </Switch>
        )}

        <Redirect from="*" to="/" />

      </Layout>
    </Router>
  )
}

export default App