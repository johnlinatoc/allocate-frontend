import React, { Component } from 'react';
import Api from "../services/api";
import {withRouter} from 'react-router-dom';


class ProfileContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
    }
  }

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

  handleChange(e){
    this.setState({
      username: e.target.value
    })
  }

  handleUpdate(){

  }

  handleDelete(){
    let resp = window.confirm("Are you sure you would like to delete your account?");
    if (resp === true) {
      fetch(`http://localhost:3000/current_user/${this.props.userInfo.id}`, {method: 'DELETE'})
      alert('User has been deleted');
      this.props.history.push('/login');
    }
  }

  render(){
    console.log(this.props.userInfo.id)
    return (
      <div className="profile-container" style={{ color: 'black' }}>
        <h1>Welcome, {this.props.userInfo.username}!</h1>
        <div className='profile-info'>
          <p>
            Account Name: {this.props.userInfo.username}
          </p>
          <input
          onChange={(e)=>this.handleChange(e)}
          placeholder='Update Username'
          value={this.state.username}/>
          <button> Update Username </button>
          <button onClick={()=>this.handleDelete()}> Delete Account </button>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileContainer);
