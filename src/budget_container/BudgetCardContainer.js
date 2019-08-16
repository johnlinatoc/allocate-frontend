import React, { Component } from 'react'
import BudgetTransactionsCard from './BudgetTransactionsCard'
import './styles/card.css'
import ProgressBar from './ProgressBar.js'

class BudgetCardContainer extends Component {
  constructor(){
    super()
    this.state = {
      flipped: false,
      total: 0,
      budget: 0
    }
  }

  handleflip = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  componentDidUpdate(){
    let transactions = this.renderTotal()
    if(this.state.total !== transactions) {
      return this.setState({
        total: transactions,
        budget: this.props.category.budget
      })
    }
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

  calcPercentage(){
    let total = (this.state.total / this.state.budget) * 100
    // if (total >= 100) {
    //   return total = 100
    // }

    return total
  }
  // <h4 className='category-budget'>Budget: ${category.budget}</h4>

  render(){
    const { category } = this.props
    const names = this.renderCategoryTransactionNames()
    const amounts = this.renderCategoryTransactionAmounts()

    const isClicked = this.state.flipped
    let container;

    if (!isClicked) {
       container = <div className='card-header'>

         <h4 className='category-spent'>Spent: ${this.renderTotal()}</h4>
         <h3 className='category-name'>{category.name}</h3>
       </div>
    } else {
       container = <BudgetTransactionsCard
       key={category.id}
       names={names}
       amounts={amounts}/>
    }

    return(

        <div className='budget-card' onClick={()=>{ this.handleflip() }}>
          <div className='card-progress-bar'>
            <ProgressBar className='card-bar' percentage={this.calcPercentage()}/>
          </div>
          { container }

        </div>
    )
  }

}

export default BudgetCardContainer
