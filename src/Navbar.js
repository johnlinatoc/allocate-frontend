import React, { Component } from 'react'
import Icon from './images/icon.png'
import {Link, withRouter} from 'react-router-dom';

class Navbar extends Component {
  render(){
    return(
      <div id='navbar'>
        <Link to='/'>
          <div className='title-container'>
            <img className='icon' src={Icon} />
            <div className='name'>Budge</div>
          </div>
        </Link>
        <div className='account-container'>
          Welcome, Username<img src='jh'></img>
        </div>
        <div className='categories-container'>
          <Link to="/" className="nav-link-text">
            <div className="nav-link"><span>Home</span></div>
          </Link>
          <Link to="/budget" className="nav-link-text">
            <div className="nav-link"><span>myBudget</span></div>
          </Link>
          <Link to="/explore" className="nav-link-text">
            <div className="nav-link"><span>Explore</span></div>
          </Link>
          <Link to="/login" className="nav-link-text">
            <div className="nav-link"><span>Login</span></div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
