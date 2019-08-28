import React, { Component } from 'react'

class BudgetCardExpense extends Component {

  render(){
    const { name, amount } = this.props
    return(
      <div className='trans-card'>
        {name} <span>${amount}</span>
        <hr/>
      </div>
    )
  }
}

export default BudgetCardExpense
