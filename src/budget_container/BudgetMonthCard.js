import React, { Component } from 'react'
import './styles/card.css'
import ProgressBar from './ProgressBar.js'


export default class BudgetMonthCard extends Component {

  renderMonthTransactions(){
    let allMonthTrans = this.props.transactions
    let total = 0;

    const thisMonthTrans = allMonthTrans.filter((trans)=>{return trans.monthly_budget_id === this.props.id})
    for(let expense of thisMonthTrans) {
      total += expense.amount
    }
    return total
  }

  calcPercentage(){
    let total = (this.renderMonthTransactions() / this.props.month.monthly_budget) * 100
    return total
  }

  render(){
    const { month } = this.props
    console.log(month)
    {this.renderMonthTransactions()}
    return(
      <div className='month-card'>
        <h2 className='month-card-name'> {month.name} {month.year}</h2>
        <ProgressBar percentage={this.calcPercentage()} />
        <h4 className='spent'> Spent ${this.renderMonthTransactions()} </h4>
        <h4 className='income'> Income ${month.monthly_budget} </h4>
      </div>
    )
  }
}
