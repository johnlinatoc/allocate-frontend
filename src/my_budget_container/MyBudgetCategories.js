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
          transAmounts[trans.category_id] += trans.amount;
      } else {
        transAmounts[parseInt(trans.category_id)] = trans.amount;
      }
    });

    const thisMonthsCats = categories.filter(
      cat => cat.monthly_budget_id == month[0].id
    );

    let entries = Object.entries(transAmounts);
    let sortedAmountTotals = entries.sort((a, b) => a[1] - b[1]);
    console.log('sortedAmountTotals', sortedAmountTotals )
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

    console.log("danger", danger);
    // console.log("dangerCats", dangerCats);
    // console.log("warning", warning);
    // console.log("warningCats", warningCats);
    // console.log("okayCats", okayCats);
    return {dangerCats: dangerCats, warningCats: warningCats, okayCats: okayCats}
  }

  renderDangerCats() {
    if (this.props.categories.length > 0 ) {
      const found = this.findDangerCats();
      const dangerCats = found.dangerCats;
      const warningCats = found.warningCats;
      const okayCats = found.okayCats;

       if (dangerCats.length > 0) {
          return (
            <div>
            <h4> <span>Budget Status:</span> Looks like you went over this month!</h4> {
              dangerCats.map(cat => {
                return (
                  <div>
                    <h5 className='danger-cat'> {cat.name} </h5>
                  </div>
                )
              })
            }
          </div>
          )
        } else if (warningCats && warningCats.length > 0) {
       return (
         <div>
         <h4><span>Budget Status:</span> Budgets you are close to going over</h4> {
           warningCats.map(cat => {
             return (
               <div>
                 <h5 className='warning-cat'> {cat.name} </h5>
               </div>
             )
           })
         }
       </div>
       )
     } else if (okayCats && okayCats.length > 0) {
    return (
      <div>
      <h4><span>Budget Status:</span>All your budgets are looking good!</h4> {
        okayCats.map(cat => {
          return (
            <div>
              <h5 className='okay-cat'> {cat.name} </h5>
            </div>
          )
        })
      }
    </div>
    )
  } else {
       return (
         <div>
         <h4><span>Budget Status:</span> Start your budget for this month today!</h4>
       </div>
       )
     }
   }
  }


  render() {

    const popCategory = this.findPopCategory();
    return (
      <div className="my-budget-category-container">
        <h2>Overview</h2>
        <div className='cat-buttons'>
          <button className='cat-button' onClick={e => {this.props.pageBack(e) }}> &laquo; </button>
          <button className='cat-button' onClick={e => {this.props.pageForward(e) }}> &raquo; </button>
        </div>

        <div className='cat-month-year'>
          <h3>{this.props.month[0].name}  {this.props.month[0].year} </h3>
        </div>


        <div className='cat-pop'>
          <h4>You've spent the most in this budget:</h4>
          {popCategory ? ( <h5>{popCategory.name}</h5> ) : ( <h5> No Transactions Yet! </h5> )}
        </div>
        <div className='danger-cats'>
          { this.renderDangerCats()}
        </div>
      </div>
    );
  }
}

export default MyBudgetCategories;
