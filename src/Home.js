import React, { Component } from 'react'

export default class Home extends Component{

  render(){
    return(
      <div>
        {this.props.month.name}
      </div>
    )
  }
  // month.map(budget => {return <div>budget.monthly_budget</div>})
}
