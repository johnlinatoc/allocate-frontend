import React, { Component } from "react";
import "./styles/card.css";
import ProgressBar from "./ProgressBar.js";

export default class BudgetMonthCard extends Component {
  constructor(){
    super()
    this.state = {
      isClicked: false
    }
  }

  renderMonthTransactions() {
    let allMonthTrans = this.props.transactions;
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
      (this.renderMonthTransactions() / this.props.month.monthly_budget) * 100;
    return total;
  }


  // { this.renderMonthTransactions(); }
  render() {
    const { month } = this.props;
    return (
      <div className="month-card">
        <div className="month-card-name">
          <button id='month-back' onClick={(e)=>{this.props.pageBack(e)}}> &laquo; </button>
          <h2 className='month-header'>{month.name} {month.year}</h2>
          <button id='month-forward' onClick={(e)=>{this.props.pageForward(e)}}>&raquo;</button>
        </div>
        {this.props.month.monthly_budget >= 1 ? (
          <div>
            <div id='main-month-bar'>
              <ProgressBar percentage={this.calcPercentage()} />
            </div>
            <div id='main-month-info'></div>
            <h4 className="spent"> Spent ${this.renderMonthTransactions()} </h4>
            <h4 className="income"> Income ${month.monthly_budget} </h4>
          </div>
        ) : <p>Budget Not Started</p>}
      </div>
    );
  }
}
