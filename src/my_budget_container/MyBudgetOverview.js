import React, { Component } from 'react'
import './my_budget_container_styles.css'

class MyBudgetOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render(){
    return(
      <div className='my-budget-overview-container'>
        MyBudgetOverview
        <p>show how much overall is left in month with days</p>
          <button id="month-back" onClick={e => { this.props.pageBack(e); }}> &laquo; </button>
          <button id="month-forward" onClick={e => { this.props.pageForward(e); }}>  &raquo; </button>
      </div>
    )
  }
}

export default MyBudgetOverview
