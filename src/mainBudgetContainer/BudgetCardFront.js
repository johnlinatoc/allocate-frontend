import React, { useState } from 'react'
import BudgetCardBack from './BudgetCardBack'
import ProgressBar from './ProgressBar.js'

const BudgetCardFront = ({ category, expenses }) => {
  const [flipped, setFlipped] = useState(false)

  const renderTotal = () => {
    let filtered;
    let total = 0;

    filtered = expenses.filter((expense)=>{
      return expense.category_id === category.id
    })

    for(let expense of filtered) {
      total += expense.amount
    }

    return total;
  }

  const calcPercentage = () => {
    let total = 0
    total = (renderTotal() / category.budget) * 100
    return total
  }

  const renderCard = () =>{
    if (!flipped) {
      return <div className='card-header'>
        <div className='card-progress-bar'>
          <ProgressBar className='card-bar' percentage={calcPercentage()}/>
        </div>
        <h4 className='category-spent'>Spent ${renderTotal()}</h4>
        <h2 className='category-name'>{category.name}</h2>
      </div>
    } else {
      let filtered;

      filtered = expenses.filter((expense)=>{
        return expense.category_id === category.id
      })

      return <BudgetCardBack
          key={category.id}
          category={category}
          total={renderTotal()}
          expenses={filtered}/>
    }
  }

  {
    return(
        <div className='budget-card' onClick={()=>{ setFlipped(!flipped) }}>
          { renderCard() }
        </div>
    )
  }
}

export default BudgetCardFront
