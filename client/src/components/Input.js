import React from 'react';

const Input = (props) => {
  
  return (
    <div className="inputContainer">
      <input value={props.input} onChange={(e)=> props.setInput(e.target.value)} type="text" placeholder="Example: https://www.google.co.il"/>
      <button onClick={props.handleOnClickShorten}>Shorten</button>
    </div>
  )
}

export default Input;