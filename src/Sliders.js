import "./css/Sliders.css";
import React, { Component } from 'react'

export default class Sliders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstSliderValue: 50,
            secondSliderValue: 50,
            thirdsliderValue: 50
        }

        this.update = this.update.bind(this);
    }

    update(event) {
        const target = event.target;
        if (target.name === "first") {
            this.setState({ firstSliderValue: target.value })
        }
        else if (target.name === "second") {
            this.setState({ secondSliderValue: target.value })
        }
        else {
            this.setState({ thirdsliderValue: target.value })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <p> Нет {100 - this.state.firstSliderValue}%
                        <input
                            name="first"
                            className="slider"
                            type="range"
                            min="0"
                            max="100"
                            value={this.state.firstSliderValue} onChange={this.update}></input>
                        {this.state.firstSliderValue}% Да
                    </p>
                </div>
                <div>
                    <p> Нет {100 - this.state.secondSliderValue}
                        <input
                            name="second"
                            className="slider"
                            type="range"
                            min="0"
                            max="100"
                            value={this.state.secondSliderValue} onChange={this.update}></input>
                        {this.state.secondSliderValue}% Да
                    </p>
                </div>
                <div>
                    <p> Нет {100 - this.state.thirdsliderValue}
                        <input
                            name="third"
                            className="slider"
                            type="range"
                            min="0"
                            max="100"
                            value={this.state.thirdsliderValue} onChange={this.update}></input>
                        {this.state.thirdsliderValue}% Да
                    </p>
                </div>
            </div>
        )
    }
}
