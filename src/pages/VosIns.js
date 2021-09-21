import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Instructions from '../Instructions';

export default class VosIns extends Component {

    render() {
        return (
            <div className="info">
                {Instructions.vosIns()}
                <Link to='./vos'><button>Начать тест</button></Link>
            </div>
        )
    }
}
