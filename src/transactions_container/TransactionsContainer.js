import React, { Component } from 'react'
import BudgetTransactionName from '../budget_container/BudgetTransactionName'
import BudgetTransactionAmount from '../budget_container/BudgetTransactionAmount'
import TransactionCard from './TransactionCard'
import './styles/container.css'

export default class TransactionsContainer extends Component {
  constructor(){
    super()
    this.state = {
      amount: 0,
      category_id: 0,
    }
  }

  // renderCategoryTransactionNames(){
  //   const { transactions } = this.props
  //   let names;
  //   names = transactions.map((transaction)=>{return transaction.name})
  //   return names
  // }
  //
  // renderCategoryTransactionAmounts(){
  //   const { transactions } = this.props
  //   let amounts;
  //   amounts = transactions.map((transaction)=>{return transaction.amount})
  //   return amounts
  // }
  //
  // renderTransactionName(){
  //   const names = this.renderCategoryTransactionNames()
  //   return names.map(name=> {
  //     return <BudgetTransactionName name={name}/>})
  // }

  // renderTransactionAmount(){
  //   const amounts = this.renderCategoryTransactionAmounts()
  //   return amounts.map(amount=> {
  //     return <BudgetTransactionAmount amount={amount}/>})
  // }

  renderTransactionCard(){
    const transactions = this.props.transactions

    return transactions.map(trans =>
      {return <TransactionCard info={trans}/>})
  }

  render(){
    return(
      <div className='transactions-container'>
        <h3>Expenses</h3>
        {this.renderTransactionCard()}
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
