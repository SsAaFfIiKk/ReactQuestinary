import React, { Component } from 'react'

class Sections extends Component {

    static personal(fun) {
        return (
            <div>
                <p><span>Определение индивидуальных особенностей</span></p>
                {fun}
            </div>
        )
    }

    static team(fun) {
        return (
            <div>
                <p><span>Оценка роли в команде</span></p>
                {fun}
            </div>
        )
    }

    static about(fun) {
        return (
            <div>
                <p><span>О себе</span></p>
                {fun}
            </div>
        )
    }
}

export default Sections