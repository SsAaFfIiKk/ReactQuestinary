import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Sections extends Component {

    static personal(fun) {
        return (
            <div>
                <p><span>Личностные характеристики</span></p>
                {fun}
            </div>
        )
    }
}

export default Sections