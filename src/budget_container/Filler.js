import React from 'react'
import './styles/card.css'

const Filler = (props) => {

  let fillerStyle;

  if (props.percentage <= 100) {
     fillerStyle = {
       width: `${props.percentage}%`
     }
  } else if (props.percentage === 100){
     fillerStyle = {
      width: `100%`,
      background: 'green'}
  } else if (props.percentage >= 100){
    fillerStyle = {
     width: `100%`,
     background: 'red'}
  } else {
    fillerStyle = {
     width: `0%`,
    }
  }

  return <div
    className="filler"
    style={ fillerStyle }
    />
}

export default Filler
