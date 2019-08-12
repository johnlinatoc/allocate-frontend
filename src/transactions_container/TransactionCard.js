import React from 'react';

const TransactionCard = (props) => {
  return (
    <div>
      <div className="trans-name">
        {props.info.name}
      </div>
      <div className="trans-amount">
        ${props.info.amount}
      </div>
    </div>
  )
}

export default TransactionCard
