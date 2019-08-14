import React, { Component } from "react";
import BudgetContainer from "./budget_container/BudgetContainer";
import TransactionsContainer from "./transactions_container/TransactionsContainer";
import Api from "./services/api";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
      categories: [],
      transactions: [],
      page: 0,
      month: [],
    };
  }

  pageForward = (e) => {
    e.preventDefault()
    let start = this.state.page;
    if (start < this.state.months.length - 1) {
      start += 1
      this.setState({
        page: start
      })
    }
  }

  pageBack = (e) => {
    e.preventDefault()
    let start = this.state.page;
    if (start > 0){
      start -= 1
      this.setState({
        page: start
      })
    }
  }

  componentDidMount() {

    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      Api.currentUser(token).then(data => {
        //console.log("data", data);
        if (data.error) {
          this.props.history.push("/login");
        } else {
          this.props.handleLogin(data);
          this.fetchMonth();
          this.fetchCategories();
          this.fetchTransactions();
        }
      });
    }
  }

  fetchMonth() {
    const userId = this.props.userInfo.id

    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    return fetch(`http://localhost:3000/users/${userId}/months`, reqObj)
      .then(resp => resp.json())
      .then(data => this.setState({ months: data }))
      .catch(err => {
        console.error(err);
      });
  }

  fetchCategories() {
    const userId = this.props.userInfo.id

    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    return fetch(`http://localhost:3000/users/${userId}/categories`, reqObj)
      .then(resp => resp.json())
      .then(data => this.setState({ categories: data }))
      .catch(err => {
        console.error(err);
      });

  }

  fetchTransactions() {
    const userId = this.props.userInfo.id

    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    return fetch(`http://localhost:3000/users/${userId}/transactions`, reqObj)
      .then(resp => resp.json())
      .then(data => this.setState({ transactions: data }))
      .catch(err => {
        console.error(err);
      });
  }

  renderPerMonth(){
    const { categories, transactions, months } = this.state;
    const start = this.state.page
    const perMonthMon = this.state.months.slice(start, start + 1)
    const allMonthCats = this.state.categories
    const allMonthTrans = this.state.transactions

    if (perMonthMon[0]){
      const thisMonthCats = allMonthCats.filter((cats)=>{return cats.monthly_budget_id === perMonthMon[0].id})
      const thisMonthTrans = allMonthTrans.filter((trans)=>{return trans.monthly_budget_id === perMonthMon[0].id})
      return <div>
        <BudgetContainer
          months={perMonthMon}
          transactions={transactions}
          categories={thisMonthCats}
          />

        <TransactionsContainer
          categories={thisMonthCats}
          transactions={thisMonthTrans}
          id={this.props.userInfo.id}
          />
      </div>
    }
  }

  render() {

    return (
      <div>
        <button onClick={(e)=>{this.pageBack(e)}}>back</button>
        <button onClick={(e)=>{this.pageForward(e)}}>forward</button>
        {this.renderPerMonth()}
      </div>
    );
  }
}
