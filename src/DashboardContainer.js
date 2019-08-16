import React from 'react'

const DashboardContainer = (props) => {
  return (
      <div className="" style={{ color: 'white' }}>
        <button onClick={(e)=>{this.pageBack(e)}}>back</button>
        <button onClick={(e)=>{this.pageForward(e)}}>forward</button>
        {props.renderPerMonth()}
      </div>
    )
}

export default DashboardContainer
