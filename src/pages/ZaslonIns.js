import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ZaslonIns extends Component {


    render() {
        return (
            <div>
                <p>ограничение по времени: 15 минут</p>
                В этой брошюре содержатся вопросы, цель которых выяснить Ваши взгляды и интересы,
                что крайне важно для командной работы.
                Отвечая на вопрос,
                Вы можете выбрать только один из четырех предложенных вариантов ответов.
                <Link to='./zaslon'><button>Начать тест</button></Link>
            </div>
        )
    }
}
