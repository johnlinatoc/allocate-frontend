import React from 'react'

const Filler = ({percentage}) => {
  let fillerStyle, fillerClassName;

  if (percentage < 100) {
    fillerClassName = 'filler-4'
     fillerStyle = {
       width: `${percentage}%`
     }
  } else if (percentage === 100){
    fillerClassName = 'filler-3'
     fillerStyle = {
      width: `100%`}
  } else if (percentage > 100){
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
