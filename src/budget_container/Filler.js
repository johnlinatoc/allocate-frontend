import React from 'react'
import './styles/card.css'

const Filler = (props) => {
  console.log('filler', props)
  let fillerStyle;

  if (props.percentage <= 100) {
     fillerStyle = {
       width: `${props.percentage}%`
     }
  } else if (props.percentage === 100){
     fillerStyle = {
      width: `100%`,
      background: 'white'}
  } else if (props.percentage >= 100){
    fillerStyle = {
     width: `100%`,
     background: 'crimson'}
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
