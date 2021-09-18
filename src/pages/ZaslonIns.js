import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ZaslonIns extends Component {


    render() {
        return (
            <div>
                <p><span>Ограничение по времени: 15 минут</span></p>
                В этой брошюре содержатся вопросы, цель которых выяснить Ваши взгляды и интересы,что крайне важно для командной работы.
                <br/>
                Отвечая на вопрос, Вы можете выбрать только один из четырех предложенных вариантов ответов.
                <br />
                <Link to='./zaslon'><button>Начать тест</button></Link>
            </div>
        )
    }
}
