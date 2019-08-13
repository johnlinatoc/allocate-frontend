import React, { Component } from "react";
import Icon from "./images/icon.png";
import { Consumer } from "./App";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {

  renderNavbar() {
    return this.props.userInfo.id
      ? this.renderLoggedInNavbar()
      : this.renderLoggedOutNavbar();
  }

  renderLoggedInNavbar() {
    return (
      <div>
        <Link to="/home">
          <div className="title-container">
            <img className="icon" src={Icon} alt="" />
            <div className="name">Budge</div>
          </div>
        </Link>

        <div className="account-container">
          Welcome, {this.props.userInfo.username}
        </div>

        <div className="categories-container">
          <Link to="/home" className="nav-link-text">
            <div className="nav-link">
              <span>Home</span>
            </div>
          </Link>

          <Link to="/myBudget" className="nav-link-text">
            <div className="nav-link">
              <span>myBudget</span>
            </div>
          </Link>

          <Link to="/explore" className="nav-link-text">
            <div className="nav-link">
              <span>Explore</span>
            </div>
          </Link>

          <a to="/" className="nav-link-text">
            <div
              className="nav-link"
              onClick={() => {
                this.props.handleLogout();
                this.props.history.push("/login");
              }}
            >
              <span>Logout</span>
            </div>
          </a>
        </div>
      </div>
    );
  }

  renderLoggedOutNavbar() {
    return (
      <Link to="/login" className="nav-link-text">
        <div className="nav-link">
          <span>Login</span>
        </div>
      </Link>
    );
  }

  render() {
    return (
      // <Consumer>
      //   {({auth, handleLogout, profile}) => (
      <div id="navbar">{this.renderNavbar()}</div>
      // )}
      // </Consumer>
    );
  }
}

export default withRouter(Navbar);
