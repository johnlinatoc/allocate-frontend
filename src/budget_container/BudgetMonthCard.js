import React, { Component } from 'react'
import './styles/card.css'
import ProgressBar from './ProgressBar.js'

export default class BudgetMonthCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      total: 0,
      budget: 0
    }
  }

  componentDidUpdate(){
    let transactions = this.renderTotalTransactions()
    if(this.state.total !== transactions.total) {
      return this.setState({
        total: transactions.total,
        budget: transactions.budget
      })
    }
  }

  renderTotalTransactions = () => {
    let total = 0;
    let budget = 0;

    for(let expense of this.props.transactions) {
      total += expense.amount
    }
    budget = this.props.months[0].monthly_budget
    return {total, budget};
  }

  renderMonthName(){
    return this.props.months.map((month)=>{
      return month.name
    })
  }

  renderMonthBudget(){
    return this.props.months.map((month)=>{
      return month.monthly_budget
    })
  }

  calcPercentage(){
    let total = (this.state.total / this.state.budget) * 100

    return total
  }

  render(){
    return(
      <div className='month-card'>
        <h2 className='month-card-name'> {this.renderMonthName()} </h2>
        <ProgressBar percentage={this.calcPercentage()} />
        <h4 className='spent'> Spent ${this.state.total} </h4>
        <h4 className='income'> Income ${this.renderMonthBudget()} </h4>
      </div>
    )
  }
}
