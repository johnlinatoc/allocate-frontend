import React, { useState } from "react";
import ExpenseCard from "./ExpenseCard";
import Api from '../services/api'

const ExpenseCardContainer = ({expenses, months, categories, addExpense, id}) => {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [monthlyBudgetId, setMonthlyBudgetId] = useState(0)
  const [isClicked, setIsClicked] = useState(true);

  const renderExpenseCard =() => {
    const monthExpenses = expenses.filter(expense => expense.monthly_budget_id === months[0].id)

    return monthExpenses.map(expense => <ExpenseCard key={expense.id} info={expense} />)
  }

  const renderCategories = () => categories.map(category => (
    <option key={category.id} value={[category.id, category.monthly_budget_id]}>
      {category.name}
    </option>
  ))

  const handleSubmit = e => {
    e.preventDefault();
    Api.postExpense({
      expense_title: expenseTitle,
      amount,
      category_id: categoryId,
      monthly_budget_id: monthlyBudgetId,
      isClicked,
      user_id: id
    })
    .then(data => {
      addExpense(data)
      setExpenseTitle('')
      setAmount('')
      setCategoryId(0)
      setMonthlyBudgetId(0)
    })
  }

  const rootClassNameContainer = () => {
    let names = ['expense-card-container'];
    if (isClicked) names.push('-min');
    return names.join('');
  }

  const rootClassName = () => {
    let names = ['add-expense'];
    if (isClicked) names.push('-min');
    return names.join('');
  }

    return (
      <div>
        <h2 className="expense-header">Expenses</h2>
        <h4 className="expense-sub-header">This Month</h4>
        <div className={ rootClassNameContainer()}>
          {renderExpenseCard()}
        </div>
        <div className={rootClassName()}>
          <h4 onClick={() => setIsClicked(!isClicked)}>Add Expense</h4>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <input
              className=''
              type='text'
              value={expenseTitle}
              placeholder="expense name"
              onChange={e => setExpenseTitle(e.target.value)}
              />
            <input
              type='number'
              onChange={e => setAmount(e.target.value)}
              placeholder="amount"
              value={amount}
              />
            <select
              onChange={(e) => {
                const filteredCatId = e.target.value.split(',')[0]
                const filteredMonId = e.target.value.split(',')[1]
                setCategoryId(parseInt(filteredCatId))
                setMonthlyBudgetId(parseInt(filteredMonId))
              }}
              value={categoryId ? `${categoryId},${monthlyBudgetId}` : "0"}
              >
              <option value="0">Select Category</option>
              {renderCategories()}
            </select>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
}

export default ExpenseCardContainer