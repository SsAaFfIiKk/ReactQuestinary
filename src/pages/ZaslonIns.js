import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Instructions from "../Instructions"

export default class ZIns extends Component {

    render() {
        return (
            <div className="info">
                {Instructions.zaslonIns()}
                <Link to='./zaslon'><button>Начать тест</button></Link>
            </div>
        )
    }
}
