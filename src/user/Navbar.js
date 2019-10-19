import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { login, logout } from '../actions/index';
import { bindActionCreators } from 'redux';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isClicked: false,
      style: 'none',
    }
  }

  renderNavbar() {
    return this.props.isLogged ? this.renderLoggedInNavbar() : null
  }

  handleClick(){
    this.setState({
      isClicked: !this.state.isClicked,
    })
  }

  hamburger(){
    let names = ['hamburger hamburger--collapse'];
    if (this.state.isClicked) names.push(' is-active');
    return names.join('');
  }

  classNameChange(){
    let names = ['account-container', 'categories-container'];
    if (this.state.isClicked) {
      names = names.map( name => name + ' is-active');
    }
    return [names[0], names[1]];
  }

  display(){
    if(window.innerWidth < 600) {
      this.setState({
        style: 'inline-block',
      })
    } else {
      this.setState({
        style: 'none',
      })
    }
  }

  componentDidMount(){
    this.display();
    window.addEventListener('resize', ()=>this.display())
  }

  renderLoggedInNavbar() {
    this.classNameChange();
    return (
      <div>

        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="title-container">
            <div className="name">allocate</div>
          </div>
        </Link>

        <button
        style={{display: `${this.state.style}`}}
        className={this.hamburger()}
        type="button"
        onClick={()=>this.handleClick()}>

          <span className="hamburger-box">
          <span className="hamburger-inner"></span>
          </span>

        </button>

        <div className={this.classNameChange()[0]}>
          Welcome, {this.props.isLogged.auth.user.username}
        </div>

        <div className={this.classNameChange()[1]}>

          <Link to="/home" className="nav-link-text">
            <div>
              Home
            </div>
          </Link>

          <Link to="/myBudget" className="nav-link-text">
            <div>
              <span>myBudget</span>
            </div>
          </Link>

          <Link to="/profile" className="nav-link-text">
            <div>
              <span>Profile</span>
            </div>
          </Link>

          <a to="/login" className="nav-link-text">
            <div
              onClick={() => {
                this.props.onUserLogout();
                localStorage.removeItem("token")
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
