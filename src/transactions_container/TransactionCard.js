import React from 'react';

const TransactionCard = (props) => {
  return (
    <div className="side-trans-card">
      {props.info.name} <span>${props.info.amount}</span>
    </div>
  )
}

export default TransactionCard
