import React, { Component } from 'react';
import Sound from './Sound';

class Timer extends Component {
    constructor() {
        super();
        this.state = {
          minutes: 5,
          seconds: 0,
          checked: false
       
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addTime= this.addTime.bind(this)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className="timer  light-green lighten-4">
                { minutes === 0 && seconds === 0
                    ? <div className="time light-green-text text-darken-4"><h1>Time Remaining:</h1><h2>Done!</h2></div>
                    : <div className="time light-green-text text-darken-4"><h1>Time Remaining:</h1><h2> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2></div>
                }
                <form className="form" onSubmit={this.handleSubmit}>
                    { this.state.checked
                        ? <button className="waves-effect waves-light btn-large">stop</button>
                        : <button className="waves-effect waves-light btn-large">start</button>
                    }
                </form>
               <div className="more"> 
                    <a className="waves-effect waves-red red lighten-2 btn" onClick={() => this.addTime(5,false, true)} >- 5m</a>
                    <a className="waves-effect waves-red red lighten-2 btn" onClick={() => this.addTime(1,false, true)}>- 1m</a>
                    <a className="waves-effect waves-red red lighten-2 btn" onClick={() => this.addTime(0.5,false,false)} >- 30s</a>
                    <div className="break"></div>
                    <a className="waves-effect waves-green light-green btn" onClick={() => this.addTime(0.5,true, false)} >+ 30s</a>
                    <a className="waves-effect waves-green light-green btn" onClick={() => this.addTime(1,true, true)} >+ 1m</a>
                    <a className="waves-effect waves-green light-green btn" onClick={() => this.addTime(5,true, true)} >+ 5m</a>
               
                </div>
            </div>
        )
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    addTime(time,add, min){
        const { seconds, minutes } = this.state
        const secondHelp = time * 60
        if(add && min){
            this.setState(({ minutes }) => ({
                minutes: minutes + time
            }))
        } else if(!add && min){
            if((minutes - time) > 0  ){
                this.setState(({ minutes }) => ({
                    minutes: minutes - time
                }))
            } else if((minutes - time) < 0){
                this.setState(({ minutes }) => ({
                    minutes: 0,
                    seconds: 0
                }))
            } else {
                this.setState(({ minutes }) => ({
                    minutes: 0 
                }))
            }
        }
        else if(add && !min){ 
            if((secondHelp + seconds) > 59){
                this.setState(({ minutes }) => ({
                    minutes: minutes + 1,
                    seconds: (secondHelp + seconds) - 60
                }))
            } else {
                this.setState(({ seconds }) => ({
                    seconds: secondHelp + seconds
                }))
            }
        } else {
            if((seconds - secondHelp) < 0){
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59 + (seconds - secondHelp)
                    }))
                    if ( minutes <= 0) {
                        this.setState(({ minutes }) => ({
                            minutes: 0,
                            seconds: 0
                        }))
                    }
            } else {
                this.setState(({ seconds }) => ({
                    seconds: seconds - secondHelp
                }))
           }
        }
    }
    handleSubmit(event) {
        const audio = new Audio("../assets/gong.mp3")

        event.preventDefault();
        if(!this.state.checked){
            audio.play() 
            this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
              this.setState(({ seconds }) => ({
                seconds: seconds - 1
              }))
            }
            if (seconds === 0) {
              if (minutes === 0) {
                audio.play() 
                clearInterval(this.myInterval)
              } else {
                this.setState(({ minutes }) => ({
                  minutes: minutes - 1,
                  seconds: 59
                }))
              }
            }
          }, 1000)
        //   return (
        //     <Sound />
        //    )
        } else{
           clearInterval(this.myInterval)
        }
        this.setState({checked: !this.state.checked})
    }  
}
export default Timer;
