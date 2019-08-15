import React, { Component } from "react";
import TransactionCard from "./TransactionCard";
import "./styles/container.css";

export default class TransactionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense_title: '',
      amount: "",
      category_id: 0,
      monthly_budget_id: 0
    };
  }

  renderTransactionCard() {
    let allMonthTrans = this.props.transactions
    const thisMonthTrans = allMonthTrans.filter((trans)=>{return trans.monthly_budget_id === this.props.months[0].id})

    return thisMonthTrans.map(trans => {
            return <TransactionCard key={trans.id} info={trans} />;
    });
  }

  renderCategories() {
    const categories = this.props.categories;

    return categories.map(category => {
      //console.log(category.monthly_budget_id)
      return (
        <option key={category.id} value={[category.id, category.monthly_budget_id]}>
          {category.name}
        </option>
      );
    });
  }

  handleAmountChange(e) {
    this.setState({
      amount: parseInt(e.target.value)
    });
  }

  handleNameChange(e) {
    this.setState({
      expense_title: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault()
    const { amount, category_id, monthly_budget_id, user_id, expense_title } = this.state

    const info = this.state
    const reqObj = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: expense_title,
        amount,
        category_id,
        monthly_budget_id,
        user_id: this.props.id
      })
    }
    return fetch('http://localhost:3000/transactions', reqObj)
      .then(res => res.json())
      .then(data => this.props.addTransactions(data))
      .then( this.setState({
        expense_title: '',
        amount: "",
        category_id: 0,
        monthly_budget_id: 0
      }))
  }

  render() {
    return (
      <div className="transactions-container">
        <h3>Expenses</h3>
        {this.renderTransactionCard()}
        <div className="add-expense">
          <form onSubmit={(e) => {this.handleSubmit(e)}}>
            <input
              type={'text'}
              value={this.state.expense_title}
              placeholder={"expense name"}
              onChange={e => this.handleNameChange(e)}
              ></input>
            <input
              type={'number'}
              onChange={e => this.handleAmountChange(e)}
              placeholder={"amount"}
              value={this.state.amount}
              ></input>
            <select
              onChange={(e) => {
                const filteredCatId = e.target.value.split(',')[0]
                const filteredMonId = e.target.value.split(',')[1]
                this.setState({
                  category_id: parseInt(filteredCatId),
                  monthly_budget_id: parseInt(filteredMonId)
                });
              }}
              >
              <option>Category</option>
              {this.renderCategories()}
            </select>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
