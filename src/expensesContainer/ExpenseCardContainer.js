import React, { Component } from "react";
import ExpenseCard from "./ExpenseCard";
import Api from '../services/api'
import "./styles.css";

export default class ExpenseCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense_title: '',
      amount: "",
      category_id: 0,
      monthly_budget_id: 0,
      isClicked: true,
      userId: this.props.id,
    };
  }

  renderExpenseCard() {
    let allMonthTrans = this.props.expenses
    const thisMonthTrans = allMonthTrans.filter((trans)=>{return trans.monthly_budget_id === this.props.months[0].id})

    return thisMonthTrans.map(trans => {
            return <ExpenseCard key={trans.id} info={trans} />;
    });
  }

  renderCategories() {
    const categories = this.props.categories;

    return categories.map(category => {
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
    e.preventDefault();
    const data = this.state;
    Api.postExpense(data)
    .then(data => {
      this.props.addExpense(data)
      this.setState({
        expense_title: '',
        amount: "",
        category_id: 0,
        monthly_budget_id: 0,
      })
    })
  }

  rootClassName() {
  let names = ['add-expense'];
  if (this.state.isClicked) names.push('-min');
  return names.join('');
  }

  rootClassNameContainer() {
  let names = ['trans-card-container'];
  if (this.state.isClicked) names.push('-min');
  return names.join('');
  }

handleClick(){
  this.setState({
    isClicked: !this.state.isClicked,
  })
}

  render() {
    return (
      <div>
        <h2 className="trans-header">Expenses</h2>
        <h4 className="trans-sub-header">This Month</h4>
        <div className={ this.rootClassNameContainer()}>
          {this.renderExpenseCard()}
        </div>
        <div className={ this.rootClassName()} >
          <h4 onClick={()=>this.handleClick()}>Add Expense</h4>
          <form onSubmit={(e) => {this.handleSubmit(e)}}>
            <input
              className=''
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
              value={this.state.category_id ? `${this.state.category_id},${this.state.monthly_budget_id}` : "0"}
              >
              <option value="0">Select Category</option>
              {this.renderCategories()}
            </select>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
