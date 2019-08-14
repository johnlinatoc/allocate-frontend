import React, { Component, createContext } from "react";
import { Route, withRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";
import ExploreContainer from "./ExploreContainer";
import ProfileContainer from "./ProfileContainer";
import NewProfileContainer from "./NewProfileContainer";
import MyBudget from "./my_budget_container/MyBudget";

// export const { Provider, Consumer } = createContext({
//   auth: {},
//   handleLogout: () => {},
// })

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: { user: {} }
      // handleLogout: () => this.handleLogout(),
    };
  }

  componentDidMount() {}

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
    console.log("logged out");
  }

  render() {
    const { auth } = this.state;

    return (
      // <Provider value={this.state}>
      <div>
        <Navbar
          userInfo={auth.user}
          handleLogout={() => {
            this.handleLogout();
          }}
        />

        <Route
          exact
          path="/home"
          render={routeProps => {
            return (
              <Home
                {...routeProps}
                fetchProfile={() => {
                  this.fetchProfile();
                }}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
                userInfo={auth.user}
              />
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
          path="/myBudget"
          render={routeProps => {
            return (
              <MyBudget
                {...routeProps}
                userInfo={auth.user}
                handleLogin={user => {
                  this.handleLogin(user);
                }}
              />
            );
          }}
        />

        <Route
          path="/explore"
          render={routeProps => {
            return (
              <ExploreContainer
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
          return (
            <ProfileContainer
              {...routeProps}
              handleLogin={user => {
                this.handleLogin(user);
              }}
              />
          );
        }}
        />

      <Route
        path="/create_user"
        render={routeProps => {
          return (
            <NewProfileContainer
              {...routeProps}
              handleLogin={user => {
                this.handleLogin(user);
              }}
              />
          );
        }}
        />

      </div>

      // </Provider>
    );
  }
}

export default withRouter(App);
