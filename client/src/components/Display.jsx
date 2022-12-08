import React from 'react'

const Display = ({props}) => {
  return (
    <div>{
        console.log("i am called")+
        console.log({props})
        }</div>
  )
}

export default Display