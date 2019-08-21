import React from 'react'
import './styles/card.css'

const Filler = (props) => {
  let fillerStyle;
  let fillerClassName;

  if (props.percentage <= 100) {
    fillerClassName = 'filler-4'
     fillerStyle = {
       width: `${props.percentage}%`
     }
  } else if (props.percentage === 100){
    fillerClassName = 'filler-3'
     fillerStyle = {
      width: `100%`}
  } else if (props.percentage >= 100){
    fillerClassName = 'filler-2'
    fillerStyle = {
     width: `100%`}
  } else {
    fillerClassName = 'filler-1'
    fillerStyle = {
     width: `0%`,
    }
  }

  return <div
    className={ fillerClassName }
    style={ fillerStyle }
    />
}

export default Filler
