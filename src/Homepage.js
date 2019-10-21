import React, { Component } from "react";
import BudgetContainer from "./mainBudgetContainer/BudgetContainer";
import ExpenseCardContainer from "./expensesContainer/ExpenseCardContainer";
import Api from "./services/api";
import { connect } from 'react-redux';
import { login, logout } from './actions/index';
import { bindActionCreators } from 'redux';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
      categories: [],
      expenses: [],
      page: 0,
    };
  }

  pageForward(e) {
    e.preventDefault()

    let start = this.state.page;
    if (start < this.state.months.length - 1) {
      start += 1
      this.setState({
        page: start
      })
    }
  }

  pageBack(e) {
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
          console.log('homepage')
          this.props.handleLogin(data);
          this.props.onUserLogin(data);
          this.fetchMonth();
          this.fetchExpenses();
        }
      });
    }
  }

  addExpense(data){
    let newState = [...this.state.expenses, data]
    this.setState({ expenses: newState })
  }

  fetchMonth() {
    Api.fetchMonth(this.props.userInfo.id)
    .then(data => this.setState({ months: data }))
    .catch(err => {
      console.error(err);
    });
  }

  fetchCategories() {
    Api.fetchCategories(this.props.userInfo.id)
    .then(data => this.setState({ categories: data }))
    .catch(err => {
      console.error(err);
    });
  }

  fetchExpenses() {
    Api.fetchExpenses(this.props.userInfo.id)
    .then(data => {
      this.setState({ expenses: data })
      this.fetchCategories();
    })
    .catch(err => {
      console.error(err);
    });
  }

  fetchAll(){
    this.fetchMonth();
    this.fetchExpenses();
  }

  renderPerMonth(){
    const { categories, expenses, months } = this.state;
    const start = this.state.page
    const sortedMonths = months.sort( (a, b) =>{ return a.id - b.id })
    const perMonthMon = sortedMonths.slice(start, start + 1)
    const allMonthCats = categories
    const allMonthTrans = expenses

    if (perMonthMon[0]){
      const thisMonthCats = allMonthCats.filter((cats)=>{return cats.monthly_budget_id === perMonthMon[0].id})
      const thisMonthTrans = allMonthTrans.filter((trans)=>{return trans.monthly_budget_id === perMonthMon[0].id})
      return <div>
        <div className="budget-container">
          <BudgetContainer
          key={perMonthMon.id}
          pageBack={(e)=>{this.pageBack(e)}}
          pageForward={e=>this.pageForward(e)}
          months={perMonthMon}
          expenses={expenses}
          categories={thisMonthCats}
          userInfo={this.props.userInfo}
          fetchAll={()=>this.fetchAll()}
          />
        </div>
        <div className="expenses-container">
          <ExpenseCardContainer
          categories={thisMonthCats}
          expenses={thisMonthTrans}
          months={perMonthMon}
          id={this.props.userInfo.id}
          addExpense={(data)=>{this.addExpense(data)}}
          />
        </div>
      </div>
    }
  }

  render() {
    return (
      <div>
        <div className='home-header'>
          <h1>Welcome back, {this.props.userInfo.username}!</h1>
        </div>
        {this.renderPerMonth()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isLogged: state.isLogged,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({
    onUserLogin: login,
    onUserLogout: logout,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
