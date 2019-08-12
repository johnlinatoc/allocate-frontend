import React, { Component } from 'react'
import BudgetContainer from './budget_container/BudgetContainer'
import TransactionsContainer from './transactions_container/TransactionsContainer'

export default class Home extends Component{
  constructor(){
    super()
    this.state = {
      months: [],
      categories: [],
      transactions: []
    }
  }

  componentDidMount(){
    this.fetchMonth()
    this.fetchCategories()
    this.fetchTransactions()
  }

  fetchMonth(){
    return fetch('http://localhost:3000/monthly_budgets')
    .then(resp => resp.json())
    .then(data => this.setState({months: data}))
    .catch((err)=>{console.log(err)})
  }

  fetchCategories(){
    return fetch('http://localhost:3000/categories')
    .then(resp => resp.json())
    .then(data => this.setState({categories: data}))
    .catch((err)=>{console.log(err)})
  }

  fetchTransactions(){
    return fetch('http://localhost:3000/transactions')
    .then(resp => resp.json())
    .then(data => this.setState({transactions: data}))
    .catch((err)=>{console.log(err)})
  }

  render(){
    const { months, categories, transactions } = this.state
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
