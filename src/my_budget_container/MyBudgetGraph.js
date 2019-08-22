import React, { Component } from "react";
import "./my_budget_container_styles.css";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend
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
    console.log('newData', newData)
    return newData.slice(0, 6);
  }

  renderTransactionData() {
    const monthNames = this.props.allMonths.map(month => month.name);
    const months = this.props.allMonths
    const transactions = this.props.allTransactions;
    const trans = {};
    const newData = []

    transactions.forEach(transaction => {
      if (transaction.monthly_budget_id in trans) {
        trans[transaction.monthly_budget_id] += transaction.amount;
      } else {
        trans[transaction.monthly_budget_id] = transaction.amount;
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
              data={this.renderTransactionData()}
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
