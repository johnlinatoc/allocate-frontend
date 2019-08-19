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
      </div>
    )
  }
}

export default MyBudgetOverview
