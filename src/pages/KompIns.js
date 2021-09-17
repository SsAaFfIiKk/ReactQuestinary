import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ZaslonIns extends Component {


    render() {
        return (
            <div>
                <p>ВРЕМЯ ПРОХОЖДЕНИЯ НЕ ОГРАНИЧЕНО</p>
                Настоящее тестирование предназначено для определения сферы научных интересов. Результаты, полученные в ходе данного тестирования будут влиять на перечень тем научных работ, предложенных испытуемому.
                <Link to='./komp'><button>Начать тест</button></Link>
            </div>
        )
    }
}
