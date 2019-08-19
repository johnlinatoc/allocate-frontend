import React, { Component } from "react";
import _ from "lodash";

import "./my_budget_container_styles.css";

class MyBudgetCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMonthTotal: 0
    };
  }

  // componentDidUpdate(){ this.renderPopCategory() }

  findPopCategory() {
    let categories = {};
    const { transactions } = this.props;

    transactions.forEach(trans => {
      if (trans.category_id in categories) {
        categories[trans.category_id] = categories[trans.category_id] + 1;
      } else {
        categories[trans.category_id] = 0;
      }
    });

    const cat_id = parseInt(
      Object.keys(categories)
        .sort(function(a, b) {
          return categories[a] - categories[b];
        })
        .reverse()
        .shift()
    );
    const cats = this.props.categories;
    let popCategory;
    let poppy = this.props.categories.find(cat => cat.id === cat_id);

    return poppy;
  }

  calcMonthTransactions() {
    let allMonthTrans = this.props.transactions;
    let total = 0;

    const thisMonthTrans = allMonthTrans.filter(trans => {
      return trans.monthly_budget_id === this.props.month[0].id;
    });
    for (let expense of thisMonthTrans) {
      total += expense.amount;
    }

    return total;
  }

  findDangerCats() {
    let transAmounts = {};
    let transBudgets = {};
    const { transactions, categories, month } = this.props;
    const budget = this.calcMonthTransactions();

    transactions.forEach(trans => {
      if (trans.category_id in transAmounts) {
        transAmounts[parseInt(trans.category_id)] =
          transAmounts[trans.category_id] + trans.amount;
      } else {
        transAmounts[parseInt(trans.category_id)] = 0;
      }
    });

    const thisMonthsCats = categories.filter(
      cat => cat.monthly_budget_id == month[0].id
    );

    let entries = Object.entries(transAmounts);
    let sortedAmountTotals = entries.sort((a, b) => a[1] - b[1]);
    let matched = sortedAmountTotals.map(index => {
      let indexId = parseInt(index[0]);
      let matched1 = [];
       thisMonthsCats.find(category => {
        if (category.id == indexId) {
          return matched1.push({
            category_id: category.id,
            percentage: (index[1] / category.budget) * 100
          })
        }
      });
      return matched1
    });

    //   [{category_id: 0, percentage: 0}]
    // ];
    // //
  matched.filter(cat => cat[0].percentage > 100)
    // return a
   console.log(matched)
    //
    // console.log("a", a);
    //console.log("a", a);
    console.log("thisMonthsCats", thisMonthsCats);
    // return transAmounts
  }
  renderDangerCats() {
    if (this.props.categories.length > 0 ){
       var foo = this.findDangerCats()
       return foo;
    } else{
      return null
    }
  }

  render() {



    const popCategory = this.findPopCategory();
    return (
      <div className="my-budget-category-container">
        <h3>MyBudgetCategories</h3>
        {this.props.month[0].name}
        {this.props.month[0].year}
        <br />
        <button
          id="month-back"
          onClick={e => {
            this.props.pageBack(e);
          }}
        >
          {" "}
          &laquo;{" "}
        </button>
        <button
          id="month-forward"
          onClick={e => {
            this.props.pageForward(e);
          }}
        >
          &raquo;
        </button>
        <p>Show most popular category = </p>
        { this.renderDangerCats()}
        {popCategory ? (
          <h4>{popCategory.name}</h4>
        ) : (
          <h4> No Transactions Yet! </h4>
        )}
        <p>Show most urgent catgory status</p>
        <p>1. in danger cats, 2. 80% filled, 3. All good</p>
      </div>
    );
  }
}

export default MyBudgetCategories;
