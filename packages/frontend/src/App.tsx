import React, { useState } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useQuery } from '@apollo/react-hooks'
import { useDidUpdate } from 'react-hooks-lib'

import { Layout, Auth, Exercises, Editor } from 'pages'
import { ME } from 'apollo/queries'

const history = createBrowserHistory()

const App = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const { client, data, loading, refetch } = useQuery(ME)

  useDidUpdate(() => {
    refetch()
    setIsLogged(!!data.me)
  }, [data, isLogged])

  const logout = () => {
    client.resetStore()
    localStorage.removeItem('token')
    setIsLogged(false)
    history.push('/')
  }

  return (
    <Router history={history}>
      <Layout
        logout={() => logout()}
        isLogged={isLogged}
      >
        {console.log(isLogged)}
        {isLogged ? (
          <Switch>
            <Route
                path="/"
                exact
                render={props => (
                  <Exercises me={data} {...props} />
                )}
              />
              <Route
                path="/editor/:exercise"
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
                <Auth onLogin={() => setIsLogged(true)} {...props} />
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