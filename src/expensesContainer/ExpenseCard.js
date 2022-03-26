import React from 'react';

const ExpenseCard = ({info}) => {
  const {name, amount} = info

  return (
    <div className="side-trans-card">
      {name} <span>${amount}</span>
    </div>
  )
}

export default ExpenseCard
