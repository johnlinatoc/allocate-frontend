import React from 'react';

const ExpenseCard = (props) => {
  return (
    <div className="side-trans-card">
      {props.info.name} <span>${props.info.amount}</span>
    </div>
  )
}

export default ExpenseCard
