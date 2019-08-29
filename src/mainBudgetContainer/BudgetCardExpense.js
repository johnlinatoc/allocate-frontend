import React, { Component } from 'react'

const BudgetCardExpense = (props) => {
  const { name, amount } = props

    return(
      <div className='trans-card'>
        {name} <span>${amount}</span>
        <hr/>
      </div>
    )
}

export default BudgetCardExpense
