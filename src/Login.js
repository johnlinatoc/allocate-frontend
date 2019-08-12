import React from 'react';
import Api from './services/api'


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
        if (data.error){
          this.setState({
            error: true
          })
        } else {
          this.props.handleLogin(data)
          this.props.history.push('/')
        }
      })
  }

  render(){
    return (
      <div>
        {this.state.error ? <h4>Invalid username or Password</h4> : null}
        <form onSubmit={(e)=>{this.handleLogin(e)}}>
          <input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} />
          <input onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} />
          <input type='submit' value='login' />
        </form>
      </div>
    );
  }
}

export default Login;
