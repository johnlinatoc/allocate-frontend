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
        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="title-container">
            <div className="name">allocate</div>
          </div>
        </Link>

        <div className="account-container">
          Welcome, {this.props.userInfo.username}
        </div>

        <div className="categories-container">
          <Link to="/home" >
            <div>
              <span className="nav-link">Home</span>
            </div>
          </Link>

          <Link to="/myBudget" className="nav-link-text">
            <div>
              <span className="nav-link">myBudget</span>
            </div>
          </Link>

          {
          //   <Link to="/explore" className="nav-link-text">
          //   <div className="nav-link">
          //     <span>Explore</span>
          //   </div>
          // </Link>
        }

          <Link to="/profile" className="nav-link-text">
            <div>
              <span className="nav-link">Profile</span>
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
    return <div>
    </div>
  }

  render() {
    return (
      <div id="navbar">{this.renderNavbar()}</div>
    );
  }
}

export default withRouter(Navbar);
