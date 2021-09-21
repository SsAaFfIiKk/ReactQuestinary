import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Instructions from "../Instructions"

export default class OMO extends Component {
    render() {
        return (
            <div className="info">
                {Instructions.omoIns()}
                <Link to='./omo'><button>Начать тест</button></Link>
            </div>
        )
    }
}
