import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./user/Login";
import Navbar from "./Navbar";
import Signup from "./user/Signup";
import ProfileContainer from "./user/ProfileContainer";
import MyBudgetContainer from "./myBudget/MyBudgetContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: { user: {} },
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
  }

  handleLogout() {
    this.setState({
      auth: { user: {} },
      profile: ""
    });
    localStorage.removeItem("token");
  }

  getState = passedState => {
    this.setState({passedState});
  }

  renderNavbar(){
    const { auth } = this.state;

    return <Navbar
      userInfo={auth.user}
      handleLogin={user => {
        this.handleLogin(user);
      }}
      handleLogout={() => {
        this.handleLogout();
      }}
    />
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
              {this.renderNavbar()}
              <Homepage
                {...routeProps}
                fetchProfile={() => {
                  this.fetchProfile();
                }}
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
              {this.renderNavbar()}
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
              {this.renderNavbar()}
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

export default withRouter(App);
