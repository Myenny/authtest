import React, { Component } from 'react'
import Home from './pages/home'
import Callback from './pages/callback'
import './App.css'

import { Router, Route, Switch } from 'react-router-dom'

import Auth from './Auth/auth'
import history from './history'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

class App extends Component {
  render() {
    return (
      <Router history={history} component={App}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            exact
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            exact
            path="/callback"
            render={props => {
              handleAuthentication(props)
              return <Callback {...props} />
            }}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
