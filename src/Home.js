import React, { Component } from "react";
import BudgetContainer from "./budget_container/BudgetContainer";
import TransactionsContainer from "./transactions_container/TransactionsContainer";
import Api from "./services/api";
import "./index.css";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
      categories: [],
      transactions: [],
      page: 0,
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
        if (data.error) {
          this.props.history.push("/login");
        } else {
          this.props.handleLogin(data);
          this.fetchMonth();
          this.fetchTransactions();
        }
      });
    }
  }

  addTransaction(data){
    let newState = [...this.state.transactions, data]
    this.setState({ transactions: newState })
  }

  fetchMonth() {
    const userId = this.props.userInfo.id

    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    fetch(`http://localhost:3000/users/${userId}/months`, reqObj)
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
      .then(data => {
        this.setState({ transactions: data })
        this.fetchCategories();
      })
      .catch(err => {
        console.error(err);
      });
  }

  fetchAll(){
    this.fetchMonth();
    this.fetchTransactions();
  }

  renderPerMonth(){
    const { categories, transactions, months } = this.state;
    const start = this.state.page
    const sortedMonths = months.sort( (a, b) =>{ return a.id - b.id })
    const perMonthMon = sortedMonths.slice(start, start + 1)
    const allMonthCats = categories
    const allMonthTrans = transactions

    if (perMonthMon[0]){
      const thisMonthCats = allMonthCats.filter((cats)=>{return cats.monthly_budget_id === perMonthMon[0].id})
      const thisMonthTrans = allMonthTrans.filter((trans)=>{return trans.monthly_budget_id === perMonthMon[0].id})
      return <div>

        <BudgetContainer
          key={perMonthMon.id}
          pageBack={(e)=>{this.pageBack(e)}}
          pageForward={e=>this.pageForward(e)}
          months={perMonthMon}
          transactions={transactions}
          categories={thisMonthCats}
          userInfo={this.props.userInfo}
          fetchAll={()=>this.fetchAll()}
          />
        <div className="transactions-container">
        <TransactionsContainer
          categories={thisMonthCats}
          transactions={thisMonthTrans}
          months={perMonthMon}
          id={this.props.userInfo.id}
          addTransactions={(data)=>{this.addTransaction(data)}}
          />
        </div>
      </div>
    }
  }

  render() {
    return (
      <div id='main-home'>
        <h1>Welcome back, {this.props.userInfo.username}!</h1>
        {this.renderPerMonth()}
      </div>
    );
  }
}
export default Home
