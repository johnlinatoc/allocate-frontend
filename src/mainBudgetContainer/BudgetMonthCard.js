import React from "react";
import ProgressBar from "./ProgressBar.js";

const BudgetMonthCard = ({ expenses, id, month, pageBack, pageForward}) => {
  const renderMonthExpenses=  () => {
    let total = 0;

    const monthExpenses = expenses.filter(expense => {
      return expense.monthly_budget_id === id;
    });
    for (let expense of monthExpenses) {
      total += expense.amount;
    }
    return total;
  }

  const calcPercentage =() => {
    return (renderMonthExpenses() / month.monthly_budget) * 100;
  }

  return (
    <div className="month-card">
      <div className="month-card-name">
        <h2 className='month-header'>{month.name} {month.year}</h2>
      </div>
      <div className='month-buttons'>
        <button id='month-back' onClick={(e)=>{pageBack(e)}}> &laquo; </button>
        <button id='month-forward' onClick={(e)=>{pageForward(e)}}>&raquo;</button>
      </div>
      <div>
        <div id='main-month-bar'>
          <ProgressBar percentage={calcPercentage()} />
        </div>
        <div id='main-month-info'></div>
        <h4 className="spent"> Spent ${renderMonthExpenses()} </h4>
        <h4 className="income"> Income { month.monthly_budget ? '$' + month.monthly_budget : `$0`} </h4>
      </div>
    </div>
  );
}

export default BudgetMonthCard
