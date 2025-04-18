// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const index = this.state.index
    const x = index % 3
    const y = Math.floor ( index / 3)
     return [x , y];
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const index = this.state.index
    const x = (index % 3) + 1;
    const y = Math.floor (index / 3) + 1;
    return `Coordinates (${x}, ${y})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      timeLeft: 0,
      inputTime: 0,
      isPaused: false,
      index: 4,
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const index = this.state.index

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

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

evt.preventDefault();
  const direction = evt.target.id;
  const nextIndex = this.getNextIndex(direction);

  if (nextIndex !== this.state.index) {
    this.setState({
      index: nextIndex,
      steps: this.state.steps + 1,
      message: ''
    });
  } else {
    this.setState({
      message: `You can't go ${direction.toUpperCase()}`
    });
  }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({ email: evt.target.value})
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const { email } = this.state; // Get the email from state
  

  fetch('/your-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }), 
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
