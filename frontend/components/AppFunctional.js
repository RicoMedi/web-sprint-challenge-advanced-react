import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialIndex = 4; // the index the "B" is at
const initialSteps = 0;
const errMessage = '';

const URL = 'http://localhost:9000/api/result';

const AppFunctional = ({ className }) => {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [errorMessage, setErrorMessage] = useState(errMessage);

  const getXY = () => {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  };

  const getXYMessage = () => {
    const { x, y } = getXY();
    return `(${x}, ${y})`;
  };

  const reset = () => {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
    setSteps(initialSteps);
    setErrorMessage(errMessage);
  };

  const getNextIndex = (direction) => {
    let newIndex = index;

    switch (direction) {
      case 'left':
        newIndex = index % 3 !== 0 ? index - 1 : index;
        break;
      case 'up':
        newIndex = index >= 3 ? index - 3 : index;
        break;
      case 'right':
        newIndex = index % 3 !== 2 ? index + 1 : index;
        break;
      case 'down':
        newIndex = index < 6 ? index + 3 : index;
        break;
      default:
        break;
    }

    return newIndex;
  };

  const move = (direction) => {
    const newDirection = getNextIndex(direction);

    if (newDirection !== index) {
      setSteps(steps + 1);
      setIndex(newDirection);
      setErrorMessage('');
    } else {
      let errorMessage = '';

      switch (direction) {
        case 'left':
          errorMessage = "You can't go left";
          break;
        case 'right':
          errorMessage = "You can't go right";
          break;
        case 'up':
          errorMessage = "You can't go up";
          break;
        case 'down':
          errorMessage = "You can't go down";
          break;
        default:
          errorMessage = 'Invalid move';
      }

      setErrorMessage(errorMessage);
    }
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;
    if (id === 'email') {
      setEmail(value);
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { x, y } = getXY();

    axios
      .post(URL, { message, email, index, steps, x, y })
      .then((resp) => {
        setEmail(initialEmail);
        setErrorMessage(resp.data.message);
        console.log(resp.data.message);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates ${getXYMessage()}`}</h3>
        <h3 id="steps">You moved {steps} {steps !== 1 ?  'times': 'time'}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{errorMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => move('left')} id="left">
          LEFT
        </button>
        <button onClick={() => move('up')} id="up">
          UP
        </button>
        <button onClick={() => move('right')} id="right">
          RIGHT
        </button>
        <button onClick={() => move('down')} id="down">
          DOWN
        </button>
        <button onClick={reset} id="reset">
          Reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AppFunctional;

