import React, { Component } from 'react'
import Api from "./services/api";


class ExploreContainer extends Component{

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
      <div className="" style={{ color: 'black' }}>
        <p>
          Insert Post Input
        </p>
        <p>
          Per Post, add comment box and likes count
        </p>
        <p>
          Per Comment, add likes count
        </p>

      </div>
    )
  }
}

export default ExploreContainer
