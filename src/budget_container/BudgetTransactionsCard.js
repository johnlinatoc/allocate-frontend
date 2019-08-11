import React, { Component } from 'react'
import BudgetTransactionName from './BudgetTransactionName'
import BudgetTransactionAmount from './BudgetTransactionAmount'

class BudgetTransactionsCard extends Component {

  renderTransactionName(){
    return this.props.names.map(name=> {
      return <BudgetTransactionName name={name}/>})
  }

  renderTransactionAmount(){
    return this.props.amounts.map(amount=> {
      return <BudgetTransactionAmount amount={amount}/>})
  }


  render(){

    return(
      <div>
        <div className="trans-name">
          {this.renderTransactionName()}
        </div>
        <div className="trans-amount">
          {this.renderTransactionAmount()}
        </div>
      </div>
    )
  }
}

export default BudgetTransactionsCard
