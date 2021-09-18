import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ZaslonIns extends Component {


    render() {
        return (
            <div>
                <p><span>Время прохождения не ограничено</span></p>
                <p>Настоящее тестирование предназначено для определения сферы научных интересов. Результаты, полученные в ходе данного тестирования, будут влиять на порядок расположения тем научных работ в перечне, предложенном испытуемому.
                </p>
                <Link to='./komp'><button>Начать тест</button></Link>
            </div>
        )
    }
}
