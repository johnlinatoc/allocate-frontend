import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home'
import Login from './Login';
import Navbar from './Navbar'
import Signup from './Signup'

class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: { user: {} },
      loggedIn: false
    }
  }

  handleLogin(user){
    this.setState({
      auth: { user },
      loggedIn: true
    })
    localStorage.setItem('token', user.jwt)
  }

  handleLogout(user){
    this.setState({
      auth: { user: {} }
    })
    localStorage.removeItem('token')
  }

  render(){
    return (
      <div>
        <Navbar />
          <Route exact path="/" render={(routeProps) => {
            return <Home {...routeProps}
              handleLogin={(user) => {this.handleLogin(user)}}/>
          }} />
          <Route path="/login" render={(routeProps) => {
            return <Login {...routeProps} handleLogin={(user) => {this.handleLogin(user)}}/>
          }} />
        <Route path="/signup" render={(routeProps) => {
            return <Signup {...routeProps} handleLogin={(user) => {this.handleLogin(user)}}/>
          }} />
      </div>
    );
  }
}

export default App;
