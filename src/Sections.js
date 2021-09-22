import React, { Component } from 'react'

class Sections extends Component {

    static personal(fun) {
        return (
            <div className="central">
                <div className="midle">
                    <p className="ctitle"><span>Определение индивидуальных особенностей</span></p>
                    {fun}
                </div>
            </div>
        )
    }

    static team(fun) {
        return (
            <div className="central">
                <div className="midle">
                    <p className="ctitle"><span>Оценка роли в команде</span></p>
                    {fun}
                </div>
            </div>
        )
    }

    static about(fun) {
        return (
            <div className="central">
                <div className="midle">
                    <p className="ctitle"><span>О себе</span></p>
                    {fun}
                </div>
            </div>
        )
    }
}

export default Sections