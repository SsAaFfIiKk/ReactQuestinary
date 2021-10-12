import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Instructions from '../Instructions';

export default class InterIns extends Component {

    render() {
        return (
            <div className="info">
                {Instructions.interIns()}
                {/* {this.props.available ? (<Link to="./inter?token=7eacb3b572fb9929e28438dfca7ded7a"><button>Начать интервью</button></Link>) : ('')} */}
                <Link to="./inter"><button>Начать интервью</button></Link>
            </div>
        )
    }
}
