import React, { Component } from 'react'
import './styles/card.css'
import ProgressBar from './ProgressBar.js'

export default class BudgetMonthCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 0
    }
  }

  componentDidMount(){
    this.nextStep()
  }

  nextStep = () => {
    if(this.state.percentage === this.renderMonthBudget()) return
    this.setState({ percentage: this.renderTotalTransactions() })
    console.log(this.renderTotalTransactions())
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


  renderTotalTransactions = () => {
    let total = 0;

    for(let expense of this.props.transactions) {
      total += expense.amount
    }

    return total;
  }


  render(){
    return(
      <div>
      <ProgressBar percentage={this.state.percentage} />
      <h2>
        {this.renderMonthName()} Income: ${this.renderMonthBudget()}
        <br/>
        Spent: ${this.renderTotalTransactions()}
      </h2>
      </div>
    )
  }
}
