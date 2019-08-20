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

    const danger = matched.filter(cat => cat[0].percentage > 100)
    const dangerCats = thisMonthsCats.filter(cat => {
      let catId = cat.id
      return danger.find(category => {
        return category[0].category_id == catId
      })
    })

    const warning = matched.filter(cat => cat[0].percentage < 100 && cat[0].percentage > 80)
    const warningCats = thisMonthsCats.filter(cat => {
      let catId = cat.id
      return warning.find(category => {
        return category[0].category_id == catId
      })
    })

    const okay = matched.filter(cat => cat[0].percentage < 80)
    const okayCats = thisMonthsCats.filter(cat => {
      let catId = cat.id
      return okay.find(category => {
        return category[0].category_id == catId
      })
    })

    // console.log("danger", danger);
    // console.log("dangerCats", dangerCats);
    // console.log("warning", warning);
    // console.log("warningCats", warningCats);
    // console.log("okayCats", okayCats);
    return [dangerCats, warningCats, okayCats]
  }

  renderDangerCats() {
    if (this.props.categories.length > 0 ) {
       let dangerCats = this.findDangerCats()[0]
       if (dangerCats.length > 0) {
          return (
            <div>
            <h2>Budgets you went over!</h2> {
              dangerCats.map(cat => {
                return (
                  <div>
                    <p style={{color: 'red', fontWeight: 600 }}> {cat.name} </p>
                  </div>
                )
              })
            }
          </div>
          )
        }
       let warningCats = this.findDangerCats()[1]
       let okayCats = this.findDangerCats()[2]
     } else {
       return null
     }
  }

  render() {
    const popCategory = this.findPopCategory();
    return (
      <div className="my-budget-category-container">
        <h3>myBudge Overview</h3>
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
        <p>Most Popular Budget Category </p>
        {popCategory ? (
          <h4>{popCategory.name}</h4>
        ) : (
          <h4> No Transactions Yet! </h4>
        )}

        { this.renderDangerCats()}
      </div>
    );
  }
}

export default MyBudgetCategories;
