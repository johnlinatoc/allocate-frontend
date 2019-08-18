import React, { Component } from 'react'
import Api from "../services/api";
import './my_budget_container_styles.css'
import AllTransactions from './AllTransactions'
import MyBudgetGraph from './MyBudgetGraph'
import MyBudgetCategories from './MyBudgetCategories'
import TransactionsContainer from '../transactions_container/TransactionsContainer'
// import BudgetContainer from "./budget_container/BudgetContainer";



class MyBudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
      categories: [],
      transactions: [],
      page: 0,
    };
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

          Api.fetchMonth(this.props.userInfo.id)
          .then(data => this.setState({ months: data }))
          .catch(err => {
            console.error(err);
          });

          Api.fetchCategories(this.props.userInfo.id)
          .then(data => this.setState({ categories: data }))
          .catch(err => {
            console.error(err);
          });

          Api.fetchTransactions(this.props.userInfo.id)
          .then(data => this.setState({ transactions: data }))
          .catch(err => {
            console.error(err);
          });

        }
      });
    }
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

  addTransaction(data){
    let newState = [...this.state.transactions, data]
    this.setState({ transactions: newState })
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
      return <TransactionsContainer
        categories={thisMonthCats}
        transactions={thisMonthTrans}
        months={perMonthMon}
        id={this.props.userInfo.id}
        addTransactions={(data)=>{this.addTransaction(data)}}
        />
    }
  }

  // <MyBudgetCategories />
  // renderCategoryCards(perMonthMon, transactions, thisMonthCats){
  //   return <BudgetContainer
  //     months={perMonthMon}
  //     transactions={transactions}
  //     categories={thisMonthCats}
  //     userInfo={this.props.userInfo}
  //     />
  // }


  render(){
    // <AllTransactions transactions={this.state.transactions}/>
    return(
      <div>
        <h2>myBudge</h2>
        <div className='my-budge-container'>
          <MyBudgetGraph />
          <MyBudgetCategories />
          <div className='my-budget-trans-container'>
            {this.renderPerMonth()}
          </div>
        </div>
      </div>
    )
  }
}

export default MyBudgetContainer