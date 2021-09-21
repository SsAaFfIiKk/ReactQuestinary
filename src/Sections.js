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


}

export default Sections