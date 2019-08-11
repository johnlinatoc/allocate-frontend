import React, { Component } from 'react'
import BudgetTransactionName from '../budget_container/BudgetTransactionName'
import BudgetTransactionAmount from '../budget_container/BudgetTransactionAmount'
import './styles/container.css'

export default class TransactionsContainer extends Component {
  renderCategoryTransactionNames(){
    const { transactions } = this.props
    let names;
    names = transactions.map((transaction)=>{return transaction.name})
    return names
  }

  renderCategoryTransactionAmounts(){
    const { transactions } = this.props
    let amounts;
    amounts = transactions.map((transaction)=>{return transaction.amount})
    return amounts
  }

  renderTransactionName(){
    const names = this.renderCategoryTransactionNames()
    return names.map(name=> {
      return <BudgetTransactionName name={name}/>})
  }

  renderTransactionAmount(){
    const amounts = this.renderCategoryTransactionAmounts()
    return amounts.map(amount=> {
      return <BudgetTransactionAmount amount={amount}/>})
  }

  render(){
    return(
      <div className='transactions-container'>
        <h3>Expenses</h3>
        <div className='transactions'>
          <div className="trans-name">
            {this.renderTransactionName()}
          </div>
          <div className="trans-amount">
            {this.renderTransactionAmount()}
          </div>
        </div>
        <div className='add-expense'>
          <input></input>
          <select>
            <option>Category</option>
          </select>
          <button>Submit</button>
        </div>
      </div>
    )
  }
}
