import React from 'react';
import './index.css';

// Include Audio
const audio = document.getElementById("beep");

// Main App Component
class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    timeCount: 25 * 60,
    currentTimer: "Session",
    isPlaying: false
  }
  
  constructor(props){
    super(props);
    this.loop = undefined;
  }
  
// Lifecycle Method
  componentWillUnmount() {
    clearInterval(this.loop);
  }
  
// Event Handlers  
  handlePlayPause = () => {
   const { isPlaying } = this.state;
   
    if(isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      });
    } else {
      this.setState({
        isPlaying: true
      });
      
      this.loop = setInterval(() => {
        const { timeCount, currentTimer, breakCount, sessionCount } = this.state;
        
        if(timeCount === 0){
          this.setState({
            currentTimer: (currentTimer === "Session") ? "Break" : "Session",
            timeCount: (currentTimer === "Session") ? (breakCount * 60) : (sessionCount * 60)
          });
          
          audio.play();
        } else {
            this.setState({
              timeCount: timeCount - 1
          });
        }
      }, 1000);
    } 
  }
  
  handleReset = () => {
    this.setState({
        breakCount: 5,
        sessionCount: 25,
        timeCount: 25 * 60,
        currentTimer: "Session",
        isPlaying: false
    });
    clearInterval(this.loop);
    
    audio.pause();
    audio.currentTime = 0;
    
  }
  
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
      minutes = minutes < 10 ? ("0" + minutes) : minutes;
      seconds = seconds < 10 ? ("0" + seconds) : seconds;
    return `${minutes}:${seconds}`; 
  } 
  
  handleBreakDecrease = () => {
    const { breakCount } = this.state;
      if(breakCount > 1){
        this.setState({
          breakCount: breakCount - 1
        });
     }       
  }
  
  handleBreakIncrease = () => {
    const { breakCount } = this.state;
      if(breakCount < 60){
        this.setState({
          breakCount: breakCount + 1
        });
    }    
  }
  
  handleSessionDecrease = () => {
    const { sessionCount } = this.state;
    if(sessionCount > 1){
      this.setState({
        sessionCount: sessionCount - 1
      });
    }  
  }
  
  handleSessionIncrease = () => {
    const { sessionCount } = this.state;
      if(sessionCount < 60){
        this.setState({
          sessionCount: sessionCount + 1
        });
    }   
  }
  
  
 render(){
   const { 
          breakCount, 
          sessionCount, 
          timeCount, 
          currentTimer,
          isPlaying
         } = this.state;
   
   const breakProps = {
     title: "Break Length",
     id: "break",
     count: breakCount,
     handleDecrease: this.handleBreakDecrease,
     handleIncrease: this.handleBreakIncrease
   }
    const sessionProps = {
     title: "Session Length",
     id: "session",
     count: sessionCount,
     handleDecrease: this.handleSessionDecrease,
     handleIncrease: this.handleSessionIncrease
   }
   
   
   return(
    <div>
       <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
       </div>  
       
       <div className="clock-container">
         <h1>{currentTimer}</h1>
         <span>{this.convertToTime(timeCount)}</span>
     
         <div className="flex">
            <button onClick={this.handlePlayPause}>
              <i className={`fas fa-${isPlaying ? 'pause': 'play'}`} />
            </button>
            <button onClick={this.handleReset}>
              <i className="fas fa-sync-alt" />
            </button>
         </div>
       </div>
      </div>
    );
  }
}

// Timer functional component

const SetTimer = (props) => {
  const id = props.id;
  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{props.title}</h2>
      <div className="flex btn-wrapper">
        <button
          id={`${id}-decrement`}
          onClick={props.handleDecrease}>
          <i className="fas fa-minus" />
        </button>
        <span id={`${id}-length`}>{props.count}</span>
        <button
          id={`${id}-increment`}
          onClick={props.handleIncrease}>
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
  );
}



export default App;
