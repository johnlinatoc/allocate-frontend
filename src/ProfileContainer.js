import React, { Component } from 'react';
import Api from "./services/api";


class ProfileContainer extends Component {
  componentDidMount(){
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      Api.currentUser(token).then(data => {
        //console.log("data", data);
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
      <div className="" style={{ color: 'white' }}>
        PROFILE COMING SOON
      </div>
    )
  }
}

export default ProfileContainer
