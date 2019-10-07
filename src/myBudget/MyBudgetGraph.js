import React, { Component } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
} from "victory";

class MyBudgetGraph extends Component {

  renderMonthData() {
    const newData = [];
    const months = this.props.allMonths.map(month => month.name);
    const monthBudgets = this.props.allMonths.map(month => month.monthly_budget);

    for (let i = 0; i < months.length; i++) {
      newData.push({ month: months[i], budget: monthBudgets[i] });
    }
    return newData.slice(0, 6);
  }

  renderExpenseData() {
    const { allMonths, allExpenses } = this.props;
    const graphExpenses = {};

    allExpenses.forEach(expense => {
      if (expense.monthly_budget_id in graphExpenses) {
        graphExpenses[expense.monthly_budget_id] += expense.amount;
      } else {
        graphExpenses[expense.monthly_budget_id] = expense.amount;
      }
    });

    let obj = [];
     for (let i = 0; i < allMonths.length; i++) {
       let currentMonth = allMonths[i];
       if (graphExpenses[currentMonth.id]) {
         obj.push({month: currentMonth.name, total: graphExpenses[currentMonth.id]});
       } else {
         obj.push({month: currentMonth.name, total: 0});
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
