import React from 'react';
import Api from '../services/api';
import home from './media/home.mp4';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { bindActionCreators } from 'redux';

interface Props {
  handleLogin: Function,
  onUserLogin: Function,
  history: History,
  push: Function,
}

interface State {
  error: boolean,
  username: string,
  password: string
}

class Login extends React.Component<Props, State> {
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
          console.log('login')
          this.props.handleLogin(data);
          this.props.onUserLogin(data);
          this.props.history.push('/home');
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
          {this.state.error && <h1 style={{fontWeight: 'normal'}}>Invalid username or Password</h1>}
          <form onSubmit={(e)=>{this.handleLogin(e)}}>
            <h3>Login</h3>
            <input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} placeholder='username'/><br/>
            <input type='password' onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} placeholder='password'/><br/>
            <input className='submit' type='submit' value='login' />
            <p className="create-user">Not a member?<Link to="/signup" className="nav-link-text">
                <span>{ `Sign up now`}</span>
            </Link></p>
          </form>
        </div>
        <div className="bg-video">
          <video className='video' autoPlay loop muted>
            <source src={home} type="video/mp4" />
          </video>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    onUserLogin: login
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
