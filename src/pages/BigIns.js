import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Instructions from '../Instructions';

export default class BigIns extends Component {
    render() {
        return (
            <div className="info">
                {Instructions.bigIns()}
                <Link to='./big'><button>Начать тест</button></Link>
            </div>
        )
    }
}