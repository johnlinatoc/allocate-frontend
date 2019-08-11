import React, { Component } from 'react'
import BudgetContainer from './budget_container/BudgetContainer'
import TransactionsContainer from './transactions_container/TransactionsContainer'

export default class Home extends Component{

  render(){
    const { months, categories, transactions } = this.props
    return(
      <div>
        <BudgetContainer
          months={months}
          categories={categories}
          transactions={transactions}/>
        <TransactionsContainer
          category={categories}
          transactions={transactions}/>
      </div>
    )
  }
  // month.map(budget => {return <div>budget.monthly_budget</div>})
}
//
