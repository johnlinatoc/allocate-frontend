import React from 'react';
import Api from './services/api'

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
    Api.signup(this.state).then(
      data => {
        console.log('reg', data)
      if (data.error){
        this.setState({
          error: true
        })
      } else {
        this.props.handleLogin(data)
        this.props.history.push(`/`)
      }
    }
    )

  }

  render(){
    return (
      <div className='form-container'>
        <form onSubmit={(e)=>{this.handleSignup(e)}}>
          New Username <input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} />
          New Password <input type="password" onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} />
          <input type='submit' value='Signup' />
        </form>
      </div>
    );
  }
}

export default Signup;
