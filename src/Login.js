import React from 'react';
import Api from './services/api'
import home from './images/home.mp4'
import { VideoCover } from 'react-video-cover'
import { Link, withRouter } from "react-router-dom";
import './index.css'



class Login extends React.Component {
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

  handleLogin(e){
    e.preventDefault()
    Api.login(this.state)
      .then(data => {
        console.log('data = ', data)
        if (data.error){
          this.setState({
            error: true
          })
        } else {
          this.props.handleLogin(data)
          this.props.history.push('/home')
        }
      })
  }

  render(){
    return (
      <div className='login'>
        <div className='login-header'>
          <h1>allocate</h1>
          <p>save well</p>
        </div>
        <div className='login-form-full'>
          {this.state.error ? <h4 style={{fontWeight: '100'}}>Invalid username or Password</h4> : null}
          <form onSubmit={(e)=>{this.handleLogin(e)}}>
            <h3>Login</h3>
            <input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} placeholder='username'/><br/>
            <input type='password' onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} placeholder='password'/><br/>
            <input className='submit' type='submit' value='login' />
            <p className="create-user">Not a member?<Link to="/signup" className="nav-link-text">
              <div >
                <span>Sign up now</span>
              </div>
            </Link></p>
          </form>
        </div>
        <div className="bg-video">
          <video className='video' loop autoPlay>
            <source src={home} type="video/mp4" />
          </video>
        </div>

      </div>
    );
  }
}

export default withRouter(Login);
