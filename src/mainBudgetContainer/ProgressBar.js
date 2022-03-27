import React from 'react'
import Filler from './Filler'

const ProgressBar = ({percentage}) => {
  return (
      <div className="progress-bar">
        <Filler percentage={percentage} />
      </div>
    )
}

export default ProgressBar
