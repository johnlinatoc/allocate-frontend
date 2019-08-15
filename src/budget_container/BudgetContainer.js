import React, { Component } from "react";
import BudgetCardContainer from "./BudgetCardContainer";
import BudgetMonthCard from "./BudgetMonthCard";
import MyBudget from "../my_budget_container/MyBudget";
import "./styles/container.css";

export default class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlagged: false
    };
  }

  renderBudgetMonth() {
    const { months, transactions } = this.props;

    return months.map(month => {
      return (
        <BudgetMonthCard
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

  showMyBudget = () => {
    return this.setState({ isFlagged: !this.state.isFlagged });
  };

  renderMyBudget = () => {
    const { months } = this.props;

    return <div>
      <MyBudget
        months={months}
        userInfo={this.props.userInfo} />
    </div>
  }

  render() {
    return (
      <div className="budget-container">
        {this.renderBudgetMonth()}
        <div className="budget-cards">{this.renderBudgetCard()}</div>
        <button onClick={() => this.showMyBudget()}>
          {" "}
          {this.state.isFlagged ? "cancel" : "show"}
        </button>
        {this.state.isFlagged ? (
          this.renderMyBudget()
        ) : null}
      </div>
    );
  }
}
