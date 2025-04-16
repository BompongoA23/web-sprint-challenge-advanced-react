import React, {useState} from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage ] =useState(initialMessage);
  const [email, setEmail ] =useState(initialEmail);
  const [steps, setSteps ] =useState(initialSteps);
  const [index, setIndex ] =useState(initialIndex);



  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = index % 3
    const y = Math.floor ( index / 3)
     return [x , y];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for tnhe user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const x = (index % 3) + 1;
    const y = Math.floor (index / 3) + 1;
    return `Coordinates (${x}, ${y})`
  }
  

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage("");
    setEmail("");
    setSteps(0);
    setIndex(4);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    switch (direction) {
      case 'left':
        return index % 3 === 0 ? index : index - 1;
      case 'right':
        return index % 3 === 2 ? index : index + 1;
      case 'up':
        return index < 3 ? index : index - 3;
      case 'down':
        return index > 5 ? index : index + 3;
      default:
        return index;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    evt.preventDefault();
  const direction = evt.target.id;
  const nextIndex = getNextIndex(direction);

  if (nextIndex !== index) {
    setIndex(nextIndex);
    setSteps(steps + 1);
    setMessage('');
  } else {
    
      setMessage (`You can't go ${direction}`)
  
  }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    
      // You will need this to update the value of the input.
      setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    
    const [x,y]=getXY();

    const payload ={
      email: email,
      steps: steps,
      x: x + 1,
      y: y + 1,
    };
  

  fetch('http://localhost:9000/api/result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), 
  })
  .then(response => response.json())
  .then(data => {
    setMessage(data.message);
    setEmail("");
  })
  .catch((error) => {
    setMessage(error.message);
  });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1? 'time': 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(evt)=>move(evt)}>LEFT</button>
        <button id="up" onClick ={(evt)=>move(evt)}>UP</button>
        <button id="right" onClick ={(evt)=>move(evt)}>RIGHT</button>
        <button id="down"onClick ={(evt)=>move(evt)}>DOWN</button>
        <button id="reset"onClick ={(evt)=>reset(evt)}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange= {onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
