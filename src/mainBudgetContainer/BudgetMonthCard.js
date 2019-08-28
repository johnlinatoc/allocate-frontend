import React, { Component } from "react";
import "./styles.css";
import ProgressBar from "./ProgressBar.js";

export default class BudgetMonthCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      isClicked: false,
    }
  }

  renderMonthExpenses() {
    let allMonthTrans = this.props.expenses;
    let total = 0;

    const thisMonthTrans = allMonthTrans.filter(trans => {
      return trans.monthly_budget_id === this.props.id;
    });
    for (let expense of thisMonthTrans) {
      total += expense.amount;
    }
    return total;
  }

  calcPercentage() {
    let total =
      (this.renderMonthExpenses() / this.props.month.monthly_budget) * 100;
    return total;
  }

  renderMonthBudget(){
    return `$${this.props.month.monthly_budget}`
  }

  render() {
    const { month } = this.props

    return (
      <div className="month-card">
        <div className="month-card-name">
          <h2 className='month-header'>{month.name} {month.year}</h2>
        </div>
        <div className='month-buttons'>
          <button id='month-back' onClick={(e)=>{this.props.pageBack(e)}}> &laquo; </button>
          <button id='month-forward' onClick={(e)=>{this.props.pageForward(e)}}>&raquo;</button>
        </div>
        <div>
          <div id='main-month-bar'>
            <ProgressBar percentage={this.calcPercentage()} />
          </div>
          <div id='main-month-info'></div>
          <h4 className="spent"> Spent ${this.renderMonthExpenses()} </h4>
          <h4 className="income"> Income { month.monthly_budget ? this.renderMonthBudget() : `$0`} </h4>
        </div>
      </div>
    );
  }
}
