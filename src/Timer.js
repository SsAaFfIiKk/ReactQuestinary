import React, { Component } from 'react'
import "./css/Timer.css"
import tm from "./img/time.png"

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            seconds: 900,
            stop: false
        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer()
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    stopTimer() {
        this.setState({ stop: true })
    }

    countDown() {
        if (this.state.stop) {
            clearInterval(this.timer);
            return
        }

        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if (seconds === 0) {
            clearInterval(this.timer);
            this.props.send()
            this.props.open()
        }
    }

    render() {
        return (
            <div className="Timer">
                <img className="tmimg" src={tm} alt="Осталось"/> {this.state.time.m} : {this.state.time.s}
            </div>
        );
    }
}
