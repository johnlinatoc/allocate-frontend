import React, { Component } from 'react'

class BudgetTransactionsAmount extends Component {

  render(){
    return(
      <div>
        ${this.props.amount}
      </div>
    )
  }
}

export default BudgetTransactionsAmount
