import {Component} from "react"

import "./App.css"

class App extends Component{

  state = {isTimeMinutes:25,isTimeSeconds:0,isTimerRunning:false}

  onPlusButton = ()=>{
  this.setState(prevState=>({isTimeMinutes:prevState.isTimeMinutes+1}))
  }

  onMinusButton = ()=>{
    this.setState(prevState=>({isTimeMinutes:prevState.isTimeMinutes-1}))
  }

  onStartButton = ()=>{
    const {isTimerRunning,isTimeSeconds,isTimeMinutes} = this.state
    const isTimerCompleted = isTimeSeconds === isTimeMinutes*60

    if (isTimerCompleted){
      this.setState({isTimeSeconds:0})
    }
    if (isTimerRunning){
      clearInterval(this.timerId)
    }
    else{
      this.timerId = setInterval(this.getStartMethod,1000)
    }
    
    this.setState(prevState=>({isTimerRunning:!prevState.isTimerRunning}))
  }

  getStartMethod = ()=>{
    const {isTimeMinutes,isTimeSeconds} = this.state
    const isTimerCompleted = isTimeSeconds === isTimeMinutes*60

    if (isTimerCompleted){
      clearInterval(this.timerId)
      this.setState({isTimeSeconds:0})
    }

    this.setState(prevState=>({isTimeSeconds:prevState.isTimeSeconds+1}))
   
  }

  getTimeSecondsInFormat = ()=>{
    const {isTimeMinutes,isTimeSeconds} = this.state
    const seconds = Math.floor(((isTimeMinutes*60)-isTimeSeconds)%60)
    const hours =  Math.floor(((isTimeMinutes*60)-isTimeSeconds)/60)
    const orgSeconds = seconds<10?`0${seconds}`:seconds
    const orgHours = hours<10?`0${hours}`:hours
    return `${orgHours}:${orgSeconds}`
  }

  onResetButton = ()=>{
    this.setState({isTimeMinutes:25,isTimeSeconds:0})
    clearInterval(this.timerId)
  }

 render(){
  const {isTimeMinutes,isTimeSeconds,isTimerRunning} = this.state
  const isDisabled= isTimeSeconds > 0
  const text  = isTimerRunning?"Pause":"Start"

  return(
    <div className="app-container">
      <div className="first-container">
        <div className="running-time">
          <p className="time-para">{this.getTimeSecondsInFormat()}</p>
        </div>
      </div>
      <div className="second-container">
        <div className="button-container">
           <button className="start-button" onClick={this.onStartButton}>{text}</button>
            <button className="start-button reset-button" onClick={this.onResetButton}>Reset</button>
        </div>
       <div className="timer-container">
       <button className="plus-button" onClick={this.onPlusButton} disabled={isDisabled}>+</button>
      
       <div className="limit-label-and-value-container">
            <p className="limit-value">{isTimeMinutes}</p>
          </div>
       <button className="plus-button" onClick={this.onMinusButton} disabled={isDisabled}>-</button>
       </div>
      </div>
    </div>
  )
 }
}


export default App 