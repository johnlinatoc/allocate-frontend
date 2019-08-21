import React from 'react';
import Api from './services/api'
import beach from './images/create.mp4'
import './index.css'
import { Link, withRouter } from "react-router-dom";

class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false
    }
  }


  handleUsernameChange(e){
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  handleSignup(e){
    e.preventDefault()
    const reqObj = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    }
    Api.signup(reqObj)
      .then(data => {
        if (data.error){
          this.setState({
            error: true
          })
        } else {
          this.props.handleLogin(data)
          this.props.history.push(`/profile`)
        }
      })
  }
  render(){
    return (
      <div className='create'>
        <div className='create-header'>
          <h1>allocate</h1>
          <p>save well</p>
        </div>
        <div className='create-form-full'>
          {this.state.error ? <h4 style={{fontWeight: '100'}}>Invalid username or Password</h4> : null}
          <form onSubmit={(e)=>{this.handleSignup(e)}}>
            <h3>Create User</h3>
          <input onChange={(e) => this.handleUsernameChange(e)} placeholder='New Username' value={this.state.username} /><br/>
           <input type="password" onChange={(e) => this.handlePasswordChange(e)} placeholder='New Password'value={this.state.password} /><br/>
          <input type='submit' value='Signup' /><br/>
        </form>
        <p className="create-user">Already a member?<Link to="/login" className="nav-link-text">
            <div >
              <span>Login</span>
            </div>
          </Link></p>
      </div>
        <div className="create-bg-video">
          <video className='video' loop autoPlay>
            <source src={beach} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}
export default Signup;
