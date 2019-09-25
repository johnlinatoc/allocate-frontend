import React, { Component } from 'react';
import Api from "../services/api";


class ProfileContainer extends Component {

  componentDidMount(){
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      Api.currentUser(token).then(data => {
        if (data.error) {
          this.props.history.push("/login");
        } else {
          this.props.handleLogin(data);
        }
      });
    }
  }

  render(){
    return (
      <div className="profile-container" style={{ color: 'black' }}>
        <h1>Welcome, {this.props.userInfo.username}!</h1>
        <div className='profile-info'>
          <p>
            Account Name: {this.props.userInfo.username}
          </p>
          <button> Update Username </button>
          <button> Update Password </button>
          <button> Delete Account </button>
        </div>
      </div>
    )
  }
}

export default ProfileContainer
