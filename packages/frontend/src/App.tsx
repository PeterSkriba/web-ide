import React, { useEffect } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Loading, Layout, Auth, Exercises, Editor, CreateExercise } from 'pages'

import { loadingSelector } from 'selectors'
import { useSelector } from 'react-redux'

const history = createBrowserHistory()

const App = () => {
  const loadingVisible = useSelector(loadingSelector)

  useEffect(() => {}, [loadingVisible])

  const logout = () => {
    //client.resetStore()
    localStorage.removeItem('editor_auth-token')
    history.push('/auth')
  }

  return (
    <Router history={history}>
      {loadingVisible && <Loading />}
      <Layout logout={() => logout()}>
        <Switch>
          <Route path="/auth" exact render={props => <Auth {...props} />} />
          <Route path="/" exact render={props => <Exercises {...props} />} />
          <Route
            path="/create"
            exact
            render={props => <CreateExercise {...props} />}
          />
          <Route
            path="/:exercise"
            exact
            render={props => <Editor {...props} />}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
