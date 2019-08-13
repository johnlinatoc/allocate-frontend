import React, { Component } from 'react'
import BudgetTransactionName from './BudgetTransactionName'
import BudgetTransactionAmount from './BudgetTransactionAmount'
import uuid from "uuid";

class BudgetTransactionsCard extends Component {

  renderTransactionName(){
    return this.props.names.map(name=> {
      return <BudgetTransactionName
        key={uuid.v4()}
        name={name}/>})
  }

  renderTransactionAmount(){
    return this.props.amounts.map(amount=> {
      return <BudgetTransactionAmount
        key={uuid.v4()}
        amount={amount}/>})
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
