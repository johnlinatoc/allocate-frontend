import React from 'react'
import Filler from './Filler'
import './styles/card.css'


const ProgressBar = (props) => {
  return (
      <div className="progress-bar">
        <Filler percentage={props.percentage} />
      </div>
    )
}

export default ProgressBar
