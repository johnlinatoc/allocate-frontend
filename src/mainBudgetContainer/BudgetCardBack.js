import React, { Component } from "react";
import BudgetCardExpense from "./BudgetCardExpense";

class BudgetCardBack extends Component {
  renderTransCards() {
    const trans = this.props.expenses;
    return trans.map(expense => (
      <BudgetCardExpense
        name={expense.name}
        amount={expense.amount}
      />
    ));
  }

  calcRemainder() {
    const total = this.props.category.budget - this.props.total;
    return total;
  }

  render() {
    const { category, total } = this.props;
    return (
      <div className="card-back">
        <h4>{category.name}</h4>
        <hr/>
        <div className='card-back-cats'>
        <p>
          Budget:
        </p>
        <p>
          Spent:
        </p>
        <p className='card-back-last'>
          Remaining:
        </p>
      </div>
        <div className='card-back-data'>
        <p>
        ${category.budget}
        </p>
        <p>
        ${total}
        </p>
        <p className='card-back-last'>
        ${this.calcRemainder()}
        </p>
      </div>
        <div>
          <h5>Expenses</h5>
          {this.renderTransCards()}
        </div>
      </div>
    );
  }
}

export default BudgetCardBack;
