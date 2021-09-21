import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Instructions from '../Instructions';

export default class LusherIns extends Component {

    render() {
        return (
            <div className="info">
                {Instructions.luscjerIns()}
                <Link to='./luscher'><button onClick={this.getSesion}>Начать тест</button></Link>
            </div>
        )
    }
}