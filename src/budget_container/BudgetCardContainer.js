import React, { Component } from 'react'
import BudgetTransactionsCard from './BudgetTransactionsCard'
// import './styles/card.css'
// import ProgressBar from './ProgressBar.js'

class BudgetCardContainer extends Component {
  constructor(){
    super()
    this.state = {
      flipped: false,
    }
  }

  handleflip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  renderCategoryTransactionNames(){
    const { category } = this.props
    let filtered;
    let names;

    filtered = this.props.transactions.filter((transaction)=>{
      return transaction.category_id === category.id
    })
    names = filtered.map((transaction)=>{return transaction.name})

    return names
  }

  renderCategoryTransactionAmounts(){
    const { category } = this.props
    let filtered;
    let amounts;

    filtered = this.props.transactions.filter((transaction)=>{
      return transaction.category_id === category.id
    })
    amounts = filtered.map((transaction)=>{return transaction.amount})

    return amounts
  }

  renderTotal(){
    let total = 0;
    const { category } = this.props
    let filtered;

    filtered = this.props.transactions.filter((transaction)=>{
      return transaction.category_id === category.id
    })

    for(let expense of filtered) {
      total += expense.amount
    }

    return total;
  }

  render(){
    const { category } = this.props
    const names = this.renderCategoryTransactionNames()
    const amounts = this.renderCategoryTransactionAmounts()

    const isClicked = this.state.flipped
    let container;

    if (!isClicked) {
       container = <div className='card-header'>
         <h3>{category.name}</h3>
         <h4>Budget: ${category.budget}</h4>
         <h4>Spent: ${this.renderTotal()}</h4>
       </div>
    } else {
       container = <BudgetTransactionsCard
       names={names}
       amounts={amounts}/>
    }

    return(
      <div className='budget-card' onClick={()=>{ this.handleflip() }}>
        { container }
      </div>
    )
  }

}

export default BudgetCardContainer
