import React, { Component } from "react";
import BudgetCardFront from "./BudgetCardFront";
import BudgetMonthCard from "./BudgetMonthCard";
import NewBudget from "./NewBudget";

export default class BudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlagged: false,
      isCancelled: true,
      editEnabled: false,
    };
  }

  renderBudgetMonth() {
    const { months, expenses } = this.props;

    return months.map(month => {
      return (
        <BudgetMonthCard
          handleEdit={(e)=>this.handleEdit(e)}
          editEnabled={this.state.editEnabled}
          pageBack={this.props.pageBack}
          pageForward={this.props.pageForward}
          key={month.id}
          id={month.id}
          month={month}
          expenses={expenses}
        />
      );
    });
  }

  renderBudgetCard() {
    const { categories, expenses } = this.props;
    return categories.map(category => {
      return (
        <BudgetCardFront
          key={category.id}
          category={category}
          expenses={expenses}
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
        fetchAll={this.props.fetchAll}
        isFlagged={()=>this.isFlagged()}/>
  }

  renderButton(){
    return <button className='start-budget-button'  onClick={() => this.isFlagged()}>
      { this.state.isFlagged ? "cancel" : "Start Budget!"}
    </button>
  }

  render() {
    return (
      <div>
        {this.renderBudgetMonth()}
        <div className="budget-cards">{this.renderBudgetCard()}</div>
        { this.props.categories.length < 1 && !this.state.isFlagged ? this.renderButton() : null }
        {this.state.isFlagged ?  <div>{this.renderNewBudgetForm()} {this.renderButton()}</div> : null}
      </div>
    );
  }
}
