import React from 'react'
import Home from './home'
import Signup from './signup'
import Login from './login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom'

const App = () => {


  return (
    <div>
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Log In</Link></li>
          </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App