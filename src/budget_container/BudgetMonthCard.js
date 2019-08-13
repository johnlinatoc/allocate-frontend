import React, { Component } from 'react'
import './styles/card.css'
import ProgressBar from './ProgressBar.js'

export default class BudgetMonthCard extends Component {

  renderTotalTransactions = () => {
    let total = 0;

    for(let expense of this.props.transactions) {
      total += expense.amount
    }
    return total
  }

  calcPercentage(){
    let total = (this.renderTotalTransactions() / this.props.month.monthly_budget) * 100
    return total
  }

  render(){
    const { month } = this.props

    return(
      <div className='month-card'>
        <h2 className='month-card-name'> {month.name} </h2>
        <ProgressBar percentage={this.calcPercentage()} />
        <h4 className='spent'> Spent ${this.renderTotalTransactions()} </h4>
        <h4 className='income'> Income ${month.monthly_budget} </h4>
      </div>
    )
  }
}
