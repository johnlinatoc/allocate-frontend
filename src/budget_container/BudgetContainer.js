import React, { Component } from 'react'
import BudgetCardContainer from './BudgetCardContainer'
import BudgetMonthCard from './BudgetMonthCard'
import './styles/container.css'


export default class BudgetContainer extends Component {

  renderBudgetMonth(){
    const { months, transactions } = this.props

      return months.map((month)=>{
        return <BudgetMonthCard
          key={month.id}
          months={months}
          transactions={transactions}
          />
      })

  }

  filterTransaction(category, transactions){
    let filtered;
    let amounts;
    let names;


      filtered = this.props.transactions.filter((transaction)=>{
        return transaction.category_id === this.props.category.id
      })
      amounts = filtered.map((transaction)=>{return transaction.amount})
      names = filtered.map((transaction)=>{return transaction.name})
  }

  renderBudgetCard(){
    const { categories, transactions } = this.props
      return categories.map((category)=>{
        return <BudgetCardContainer
          key={category.id}
          category={category}
          transactions={transactions}
          />
      })

  }

  render(){
    return(
      <div className='budget-container'>
        {this.renderBudgetMonth()}
        <div className='budget-cards'>
          {this.renderBudgetCard()}
        </div>
      </div>
    )
  }
}
