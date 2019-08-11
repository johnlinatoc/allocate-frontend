import React from 'react'
import './styles/card.css'

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

export default Filler
