import React, { Component } from "react";
import BudgetCardContainer from "./BudgetCardContainer";
import BudgetMonthCard from "./BudgetMonthCard";
import NewBudget from "./NewBudget";
import "./styles/container.css";

export default class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlagged: false,
      isCancelled: true,
    };
  }



  renderBudgetMonth() {
    const { months, transactions } = this.props;

    return months.map(month => {
      return (
        <BudgetMonthCard
          pageBack={this.props.pageBack}
          pageForward={this.props.pageForward}
          key={month.id}
          id={month.id}
          month={month}
          transactions={transactions}
        />
      );
    });
  }

  renderBudgetCard() {
    const { categories, transactions } = this.props;

    return categories.map(category => {
      return (
        <BudgetCardContainer
          key={category.id}
          category={category}
          transactions={transactions}
        />
      );
    });
  }

  isFlagged() {
    return this.setState({
      isFlagged: !this.state.isFlagged,
      isCancelled: !this.state.isCancelled,
     });
  };

  renderNewBudgetForm() {
    const { months } = this.props;

    return <NewBudget
        months={months}
        userInfo={this.props.userInfo}
        isCancelled={this.state.isCancelled}
        fetchAll={this.props.fetchAll} />
  }

  renderButton(){
    return <button onClick={() => this.isFlagged()}>
      {this.state.isFlagged ? "cancel" : "Start Budget!"}
    </button>
  }

  render() {
    return (
      <div className="budget-container">
        {this.renderBudgetMonth()}
        <div className="budget-cards">{this.renderBudgetCard()}</div>
        { this.props.categories.length < 1 && !this.state.isFlagged ? <div>Would you like to start your budget for this month? {this.renderButton()}</div> : null }
        {this.state.isFlagged ?  <div>{this.renderNewBudgetForm()} {this.renderButton()}</div> : null}
      </div>
    );
  }
}
