import React, { Component } from 'react'
import BudgetCardTransaction from './BudgetCardTransaction'
import uuid from "uuid";

class BudgetCardBack extends Component {

  renderTransCards(){
    const trans = this.props.transactions
    return trans.map( transaction =>  <BudgetCardTransaction
      name={transaction.name}
      amount={transaction.amount}
      />)
  }

  calcRemainder(){
    const total = this.props.category.budget - this.props.total
    return total
  }

  render(){
    return(
      <div className='card-back'>
        <p>${this.calcRemainder()} left in {this.props.category.name}</p>
        <div>
          <h4>Expenses</h4>
          {this.renderTransCards()}
        </div>
      </div>
    )
  }
}

export default BudgetCardBack
