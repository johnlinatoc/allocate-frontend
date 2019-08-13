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
      transactions: []
    };
  }

  componentDidMount() {

    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      Api.currentUser(token).then(data => {
        console.log("data", data);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
      });
  }

  render() {
    const { categories, transactions, months } = this.state;
    // const userInfo = this.filterAll()
    {console.log(this.props.userInfo.id)}
    {console.log(months)}
    return (
      <div>
        <BudgetContainer
          months={months}
          transactions={transactions}
          categories={categories}
        />
        <TransactionsContainer
          category={categories}
          transactions={transactions}
        />
      </div>
    );
  }
  // month.map(budget => {return <div>budget.monthly_budget</div>})
}
//
