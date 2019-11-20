import React, { Component } from 'react';


class Timer extends Component {
    constructor() {
        super();
        this.state = {
          minutes: 3,
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
            <div className="timer">
                { minutes === 0 && seconds === 0
                    ? <div className="time"><h1>Busted!</h1></div>
                    : <div className="time"><h1>Time Remaining:</h1><h2> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2></div>
                }
                <form className="form" onSubmit={this.handleSubmit}>
                    <button>Start</button>
                </form>
               <div className="more"> 
                    <button className="button button-outline" onClick={() => this.addTime(5,false, true)} >- 5m</button>
                    <button className="button button-outline" onClick={() => this.addTime(1,false, true)}>- 1m</button>
                    <button className="button button-outline" onClick={() => this.addTime(0.5,false,false)} >- 30s</button>
                    <button className="button button-outline" onClick={() => this.addTime(0.5,true, false)} >+ 30s</button>
                    <button className="button button-outline" onClick={() => this.addTime(1,true, true)} >+ 1m</button>
                    <button className="button button-outline" onClick={() => this.addTime(5,true, true)} >+ 5m</button>
               
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
        // event.preventDefault();
        console.log(time, add);

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
            } else {
                this.setState(({ minutes }) => ({
                    minutes: 0 
                }))
            }

        }
        else if(add && !min){  console.log("add")
            if((secondHelp + seconds) > 59){
                
                this.setState(({ minutes }) => ({
                    minutes: minutes + 1,
                    seconds: (secondHelp + seconds) - 60
                }))
            } else {
                console.log("add 2")
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
                    console.log("naar beneden " + seconds + "  " + minutes)
                    if ( minutes < 0) {
                     //   console.log("naar beneden " + seconds + "  " + minutes)
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
        event.preventDefault();
        if(!this.state.checked){
     
            this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
              this.setState(({ seconds }) => ({
                seconds: seconds - 1
              }))
            }
            if (seconds === 0) {
              if (minutes === 0) {
                clearInterval(this.myInterval)
              } else {
                this.setState(({ minutes }) => ({
                  minutes: minutes - 1,
                  seconds: 59
                }))
              }
            }
          }, 1000)
        } else{
           clearInterval(this.myInterval)
        }
       
        this.setState({checked: !this.state.checked})
       
    }   
   
}
export default Timer;