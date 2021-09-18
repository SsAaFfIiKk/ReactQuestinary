import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ZaslonIns extends Component {

    render() {
        return (
            <div>
                <p><span>Ограничение по времени: 15 минут</span></p>
                <p>В этой брошюре содержатся вопросы, цель которых выяснить Ваши взгляды и интересы,что крайне важно для командной работы.
                </p>
                <p>Отвечая на вопрос, Вы можете выбрать только один из четырех предложенных вариантов ответов.
                </p>
                <Link to='./zaslon'><button>Начать тест</button></Link>
            </div>
        )
    }
}
