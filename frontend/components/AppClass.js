import React from 'react'
import axios from 'axios'
// I set my initial states


const initialMessage = ''
const initialEmail = ''
const initialIndex = 4 // the index the "B" is at
const initialSteps = 0

const initialState = {
message: initialMessage,
email: initialEmail,
index: initialIndex,
steps: initialSteps,
}

const URL = `http://localhost:9000/api/result`

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
   state = initialState;
  
    





  getXY = () => {
    const x = (this.state.index % 3) + 1;
    const y = Math.floor(this.state.index / 3) + 1;
    return `(${x}, ${y})`;
  }
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  

  /**
   * Helper function to reset all states to their initial values.
   */
  reset = () => {
    this.setState({
      message: '',
      email: '',
      index: 4, 
      steps: 0
    }) 
  };


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
    getNextIndex = (direction) => {
      let { index } = this.state;
    
      switch (direction) {
        case 'left':
          return index % 3 !== 0 ? index - 1 : index;
        case 'up':
          return index >= 3 ? index - 3 : index;
        case 'right':
          return index % 3 !== 2 ? index + 1 : index;
        case 'down':
          return index < 6 ? index + 3 : index;
        default:
          return index;
      }
    };
    
    
   
    
    

    move = (evt) => {
      const direction = evt.target.id;
      const newDirection = this.getNextIndex(direction, this.state.index);
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        index: newDirection,
      });
    };
    
 

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const {id, value}= evt.target;
    this.setState({
      [id]:value,
    });
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  

  render(){ 
   
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates ${this.getXY()}`}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}