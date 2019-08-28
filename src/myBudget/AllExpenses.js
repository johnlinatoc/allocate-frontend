import React, { Component } from 'react'
import './styles.css'


class AllExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <div className='my-budget-trans-container'>
        Latest Expenses
        <p>Give full CRUD access to all expense items</p>
      </div>
    )
  }
}

export default AllExpenses
