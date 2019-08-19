import React, { Component } from 'react'
import './my_budget_container_styles.css'


class AllTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <div className='my-budget-trans-container'>
        Latest Expenses
        <p>Give full CRUD access to all transaction items</p>
      </div>
    )
  }
}

export default AllTransactions
