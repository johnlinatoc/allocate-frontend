import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {

  renderNavbar() {
    return this.props.userInfo.id ? this.renderLoggedInNavbar() : null
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

          <Link to="/profile" className="nav-link-text">
            <div>
              <span className="nav-link">Profile</span>
            </div>
          </Link>

          <a to="/login" className="nav-link-text">
            <div
              className="nav-link"
              onClick={() => {
                this.props.handleLogout();
                this.props.history.push("/login");
              }}
            >
              <span style={{cursor: 'pointer'}}>Logout</span>
            </div>
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="navbar">{this.renderNavbar()}</div>
    );
  }
}

export default withRouter(Navbar);
