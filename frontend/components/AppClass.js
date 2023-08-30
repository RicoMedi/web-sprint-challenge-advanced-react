import React from 'react'

// I set my initial states
const initialMessage = ''
const initialEmail = ''
const initialIndex = 4 // the index the "B" is at
const initialSteps = 0
const intialX = 2
const initialY = 2


/** BrainStorm:
 * its a 3 by 3 matrix
 * [0,1,2]
 * [3,4,5]
 * [6,7,8]
 *
 * initial index is 4
 * starting coordinates are (1,1)
 * how to get coordinates for index 4 (?, ?)
 * x= 4%3 gives back a remainder of 1 , 5 %3 gives back 2 so far this looks like it works for this 3x3 matrix, 8 % 3 gives back a remainder of 2
 * y= 4/3 =1.333 math.floor is 1 , 5/3 = 1.666 math.floor is 1 , one more test, 8/3 = 2.666 math.floor is 2
 *
 * so if we want to get to the far right corner our y would be 2 and our x would be 2
 */


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      x: intialX,
      y: initialY
    }
  }




  getXY = () => {
    return (`(${this.state.x}, ${this.state.y})`)
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.


  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      x: intialX,
      y: initialY
    });
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    /** starting next Index is 4
     * [0,1,2]
     * [3,4,5]
     * [6,7,8]
     * For left: if I want to move left i can do 4 %3 get a remainder of 1 if its not equal to 1 i can subtract next index by 1 
     * setting next index at 3
     * for Up: if im at 3 and i click up if(3>=3); nextindex-3 returning nextIndex 0
     * sanity test: 
     * if im on index 4 and I click up if(4>=3) 
     * nextIndex -3 = 1 whis correct
     * For Right: if NextIndex is at 4 and we want to move right we can do if(4%3)!==2 im saying 2 because there only 2 indexs per row
     * than we can add nextIndex +=1 making nextIndex 5
     * sanity test: if nextIndex is 5%3 !==2 but this actually has a remainder of 2 so you would not at 1 we would just keep nextIndex at 5
     * 
     * For Down: 
     * we need to be able to stay on row 1 and 2 to be able to go down, we can get on to row 3 and try and go down starting index is 6 
     * so i would have to do an if(nextIndex < 6)
     * nextIndex +=3 
     * test: (4<6)
     * 4 + 3 = 7 nextIndex is now 7
     * cant be 6 because 6+3 would give me 9 and we only have a max of 8 indx
     */

    let nextIndex = this.state.index;
    if (direction === 'left') {
      if (nextIndex % 3 !== 0) {
        nextIndex -= 1;
      }

    } else if (direction === 'up') {
      if (nextIndex >= 3) {
        nextIndex -= 3;
      }

    } else if (direction === 'right') {
      if (nextIndex % 3 !== 2) {
        nextIndex += 1;
      }
    } else if (direction === 'down') {
      if (nextIndex < 6) {
        nextIndex += 3;
      }
    }
    return nextIndex
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

  }


  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates ${this.getXY()}`}</h3>
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
