import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./user/Login";
import Navbar from "./user/Navbar";
import Signup from "./user/Signup";
import ProfileContainer from "./user/ProfileContainer";
import MyBudgetContainer from "./myBudget/MyBudgetContainer";
import { connect } from 'react-redux';
import { login, logout } from './actions/index';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: { user: {} },
      loggedIn: false,
    };
  }

  handleLogin(data) {
    this.setState({
      auth: { user: data.user },
      loggedIn: true
    });
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
    }
    this.props.onUserLogin(data);
  }

  handleLogout() {
    this.setState({
      auth: { user: {} },
      loggedIn: false,
    });
    localStorage.removeItem("token");
    this.props.onUserLogout();
  }


  render() {
    const { auth, loggedIn } = this.state;
    return (
      <div>
        <Route exact path="/" render={() => (
            <Redirect to="/home"/>
          )}/>

        <Route
          path="/home"
          userInfo={auth.user}
          render={routeProps => {
            return (<div>
              <Navbar/>
              <Homepage
                {...routeProps}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
                userInfo={auth.user}
                />
            </div>
            );
          }}
        />

        <Route
          path="/login"
          render={routeProps => {
            return (
              <Login
                {...routeProps}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
              />
            );
          }}
        />

        <Route
          path="/myBudget"
          render={routeProps => {
            return (<div>
              <Navbar/>
              <MyBudgetContainer
                {...routeProps}
                userInfo={auth.user}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
                />
            </div>
            );
          }}
        />

        <Route
          path="/signup"
          render={routeProps => {
            return (
              <Signup
                {...routeProps}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
              />
            );
          }}
        />

        <Route
          path="/profile"
          render={routeProps => {
            return (<div>
              <Navbar/>
              <ProfileContainer
                {...routeProps}
                userInfo={auth.user}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
                />
            </div>
            );
          }}
        />

      </div>

    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isLogged: state.isLogged,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    onUserLogin: login,
    onUserLogout: logout,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
