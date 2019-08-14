import React from 'react';
import Api from './services/api'
import { Link, withRouter } from "react-router-dom";



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
      <div>
        {this.state.error ? <h4>Invalid username or Password</h4> : null}
        <form onSubmit={(e)=>{this.handleLogin(e)}}>
          Username<input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} /><br/>
          Password<input onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} /><br/>
        <input type='submit' value='login' />
        </form>
        <Link to="/create_user" className="nav-link-text">
          <div className="nav-link">
            <span>Create User</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(Login);
