import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Instructions from '../Instructions';

export default class KompIns extends Component {
    render() {
        return (
            <div className="info">
                {Instructions.kompIns()}
                <Link to='./komp'><button>Начать тест</button></Link>
            </div>
        )
    }
}
