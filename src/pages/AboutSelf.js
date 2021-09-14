import React, { Component } from 'react'
import Sliders from "./Sliders"

export default class AboutSelf extends Component {
    render() {
        return (
            <div>
                <form method="POST">
                    <div>
                        <textarea name="aboutSelf"></textarea>
                    </div>
                    <div>
                        <Sliders />
                    </div>
                    <button type="submit"> Отправить</button>
                </form>
            </div>
        )
    }
}