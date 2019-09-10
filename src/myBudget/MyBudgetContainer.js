import React, { Component } from 'react'
import Api from "../services/api";
import './styles.css'
import MyBudgetGraph from './MyBudgetGraph'
import MyBudgetCategories from './MyBudgetCategories'


class MyBudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
      categories: [],
      expenses: [],
      page: 0,
    };
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

          Api.fetchMonth(this.props.userInfo.id)
          .then(data => this.setState({ months: data }))
          .catch(err => {
            console.error(err);
          });

          Api.fetchExpenses(this.props.userInfo.id)
          .then(data => {
            this.setState({ expenses: data })
            Api.fetchCategories(this.props.userInfo.id)
            .then(data => this.setState({ categories: data }))
            .catch(err => {
              console.error(err);
            })
          }).catch(err => {
            console.error(err);
          })
        }
      });
    }
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

  renderMonth() {
    const { page, months, categories, expenses } = this.state;
    const month = months.sort((a, b)=> a.id -b.id ).slice(page, page + 1)

    if (month[0]){
      const monthCats = categories.filter((cats)=>{return cats.monthly_budget_id === month[0].id})
      const monthExpenses = expenses.filter((expense)=>{return expense.monthly_budget_id === month[0].id})
      return <MyBudgetCategories
        month={month}
        pageBack={(e)=>{this.pageBack(e)}}
        pageForward={e=>this.pageForward(e)}
        categories={monthCats}
        expenses={monthExpenses}/>
    }
  }


  render(){
    return(
      <div>
        <h1 className='my-budge-header'>myBudget</h1>
        <div className='my-budge-container'>
          <MyBudgetGraph
          allMonths={this.state.months}
          allExpenses={this.state.expenses}/>
          {this.renderMonth()}
        </div>
      </div>
    )
  }
}

export default MyBudgetContainer
