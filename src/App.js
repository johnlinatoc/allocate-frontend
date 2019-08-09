import React, { Component } from 'react';
import Home from './Home'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      month: null
    }
  }

  componentDidMount(){
    this.fetchMonth()
  }

  fetchMonth(){
    if(this.state.month === null){
      return fetch('http://localhost:3000/monthly_budgets')
      .then(resp => resp.json())
      .then(data => this.setState({month: data}))
    }
  }
  renderHome() {
    if (this.state.month) {
      return <Home month={this.state.month}/>
    }
  }

  render(){
    return (
      <div>
        {this.renderHome()}
      </div>
    );
  }
}

export default App;
