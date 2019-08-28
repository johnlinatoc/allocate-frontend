import React, { Component } from "react";
import "./styles.css";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
} from "victory";

class MyBudgetGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMonthData() {
    const months = this.props.allMonths.map(month => month.name);
    const monthBudgets = this.props.allMonths.map(
      month => month.monthly_budget
    );
    const newData = [];

    for (let i = 0; i < months.length; i++) {
      newData.push({ month: months[i], budget: monthBudgets[i] });
    }
    return newData.slice(0, 6);
  }

  renderExpenseData() {
    const months = this.props.allMonths
    const expenses = this.props.allExpenses;
    const trans = {};

    expenses.forEach(expense => {
      if (expense.monthly_budget_id in trans) {
        trans[expense.monthly_budget_id] += expense.amount;
      } else {
        trans[expense.monthly_budget_id] = expense.amount;
      }
    });

    let obj = [];
     for (let i = 0; i < months.length; i++) {
       let curr = months[i];
       if (trans[curr.id]) {
         obj.push({month: curr.name, total: trans[curr.id]});
       } else {
         obj.push({month: curr.name, total: 0});
       }
     }

   return obj.slice(0, 6);
  }

  render() {
    return (
      <div className="my-budget-graph-container">

        <VictoryChart
          domainPadding={30}
          padding={{ top: 10, bottom: 27, left: 50, right: 5 }}
        >

         <VictoryLegend x={125} y={10}
    orientation="horizontal"
    gutter={50}
    colorScale={["#151E3F", "darkred"]}
    data={[
      { name: "Budget" }, { name: "Total Expenses" }
    ]}
  />
          <VictoryGroup
            offset={13}>
            <VictoryBar
              color='#151E3F'
              animate={{ duration: 2000 }}
              data={this.renderMonthData()}
              x="month"
              y="budget"
              tickFormat={(t) => `${t}k`}
            />
            <VictoryBar
              color='darkred'
              animate={{ duration: 2000, onLoad: { duration: 4000 } }}
              data={this.renderExpenseData()}
              x="month"
              y="total"

            />
          </VictoryGroup>
        </VictoryChart>

      </div>
    );
  }
}

export default MyBudgetGraph;
