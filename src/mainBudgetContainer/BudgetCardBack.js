import React from "react";

const BudgetCardExpense = ({ name, amount }) => (
  <div className='trans-card'>
    {name} <span>${amount}</span>
    <hr/>
  </div>
)

const BudgetCardBack = ({ expenses, category, total}) => {
  const renderTransCards = () => {
    return expenses.map((expense, index) => (
      <BudgetCardExpense
        key={index}
        name={expense.name}
        amount={expense.amount}
      />
    ));
  }

  {
    return (
      <div className="card-back">
        <h4>{category.name}</h4>
        <hr/>
        <div className='card-back-info'>
          <div className='card-back-cats'>
            <p>Budget:</p>
            <p>Spent:</p>
            <p className='card-back-last'>Remaining:</p>
          </div>
          <div className='card-back-data'>
            <p>${category.budget}</p>
            <p>${total}</p>
            <p className='card-back-last'>${category.budget - total}</p>
          </div>
      </div>
        <div>
          <h5>Expenses</h5>
          {renderTransCards()}
        </div>
      </div>
    );
  }
}

export default BudgetCardBack;
