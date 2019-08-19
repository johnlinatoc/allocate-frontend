import React, { Component } from 'react'
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries} from 'react-vis';
import './my_budget_container_styles.css'
import { VictoryChart, VictoryBar, Bar } from 'victory';


class MyBudgetGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      style: {
        data: { fill: "tomato" }
      },
      data: [{id: 0, month: '', year: 0, 'budget': 0, 'expenses': 0}],
    };
  }

  groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
    }, {});
  };

  calculateData(){
    const allMonths = this.props.allMonths
    const allTransactions = this.props.allTransactions
    const data = []
    let sums = []

    allMonths.map(month => data.push({id: month.id, month: month.name, year: month.year, budget: month.monthly_budget, expenses: 0}))
    sums = this.groupBy(allTransactions, trans => trans.monthly_budget_id)
  }


  render(){
    const handleMouseOver = () => {
      const fillColor = this.state.clicked ? "blue" : "tomato";
      const clicked = !this.state.clicked;
      this.setState({
        clicked,
        style: {
          data: { fill: fillColor }
        }
      });
    };

    {this.calculateData()}
    // <VictoryChart height={400} width={400}
    //   domainPadding={{ x: 50, y: [0, 20] }}
    //   // scale={{ x: "time" }}
    //   >
    //   <VictoryBar
    //     dataComponent={
    //       <Bar events={{ onMouseOver: handleMouseOver }}/>
    //     }
    //     style={this.state.style}
    //     data={[
    //       { x: new Date(1986, 1, 1), y: 2 },
    //       { x: new Date(1996, 1, 1), y: 3 },
    //       { x: new Date(2006, 1, 1), y: 5 },
    //       { x: new Date(2016, 1, 1), y: 4 }
    //     ]}
    //     />
    // </VictoryChart>
    return(
      <div className='my-budget-graph-container'>
        Graph
        <p>Show bar graph with side by side data of budget and expenses per month</p>
      </div>
    )
  }
}

export default MyBudgetGraph
