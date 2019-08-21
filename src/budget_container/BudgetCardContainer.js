import React, { Component } from 'react'
import BudgetCardBack from './BudgetCardBack'
import './styles/card.css'
import ProgressBar from './ProgressBar.js'
import * as Icons from 'react-icons/fa';


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

  componentDidMount(){
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
    return total
  }

  renderCard(){
    const { category, transactions } = this.props
    const names = this.renderCategoryTransactionNames()
    const amounts = this.renderCategoryTransactionAmounts()
    const isClicked = this.state.flipped
    const Icon = Icons['FaBeer']


    if (!isClicked) {
      return <div className='card-header'>
        <div className='card-progress-bar'>
          <ProgressBar className='card-bar' percentage={this.calcPercentage()}/>
        </div>
        <h4 className='category-spent'>Spent ${this.renderTotal()}</h4>
        <h2 className='category-name'>{category.name}</h2>
      </div>
    } else {
      let filtered;

      filtered = this.props.transactions.filter((transaction)=>{
        return transaction.category_id === category.id
      })

      return <BudgetCardBack
          key={category.id}
          category={category}
          total={this.state.total}
          transactions={filtered}/>
    }
  }

  render(){
    return(
        <div className='budget-card' onClick={()=>{ this.handleflip() }}>
          { this.renderCard() }
        </div>
    )
  }

}

export default BudgetCardContainer
