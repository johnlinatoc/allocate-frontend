import React, { Component } from "react";
import "./styles.css";
import ProgressBar from "./ProgressBar.js";

export default class BudgetMonthCard extends Component {
  constructor(props){
    super(props);
    //add ability to flip month card so an edit form will be available to users
    this.state = {
      isClicked: false,
    }
  }

  renderMonthExpenses() {
    let { expenses } = this.props;
    let total = 0;

    const monthExpenses = expenses.filter(expense => {
      return expense.monthly_budget_id === this.props.id;
    });
    for (let expense of monthExpenses) {
      total += expense.amount;
    }
    return total;
  }

  calcPercentage() {
    return (this.renderMonthExpenses() / this.props.month.monthly_budget) * 100;
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
          <h4 className="income"> Income { month.monthly_budget ? '$' + this.props.month.monthly_budget : `$0`} </h4>
        </div>
      </div>
    );
  }
}
