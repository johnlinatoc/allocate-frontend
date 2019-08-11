import React, { Component } from 'react'
import Icon from './images/icon.png'

export default class Navbar extends Component {
  render(){
    return(
      <div id='navbar'>
        <div className='title-container'>
          <img className='icon' src={Icon} />
          <div className='name'>Budget App</div>
        </div>
        <div className='categories-container'>
          Home Budget Explore Logout
        </div>
        <div className='account-container'>
          Welcome, username [insert profile pic]
        </div>
      </div>
    )
  }
}
