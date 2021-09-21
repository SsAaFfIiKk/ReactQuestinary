import React, { Component } from 'react'

export default class InterIns extends Component {
    constructor(props) {
        super(props);

        this.createAction = this.createAction.bind(this)
    }

    createAction() {
        let record_url = "https://teachingquality.onti.actcognitive.org/record"
        document.getElementById("fio").action = record_url
        console.log(document.getElementById("fio").action);
    }

    render() {
        return (
            <div>
                Прохождение интервию станет доступным после 27 сентября 2021 года
                {/* <div className="instruction">
                    Для корректной работы сервиса необходимо придерживаться следующих условий:
                    <ol>
                        <li>необходимо качественное освещение;</li>
                        <li>отсутсвие источников света в кадре;</li>
                        <li>испытуемый должен находиться перпендикулярно камере, желательно чтобы камера находилась на
                            уровне глаз</li>
                        <li>В кадр должно полностью попадать лицо испытуемого</li>
                    </ol>

                    После нажатия кнопки <span>"Начать интервью"</span> появится окно, которое будет транслировать
                    видеозапись с Вашей камеры. Чуть ниже
                    будет отражаться текущий ворос, Вам необходимо на него полностью ответить. Важно чтобы длина ответа на
                    каждый вопрос
                    была более 30 секунд. После ответа на вопрос необходимо нажать на кнопку <span>"следующий
                        вопрос"</span>, после чего появится новый
                    вопрос. Всего вопросов будет несколько, около 10-15 штук. После ответа на все вопросы появится кнопка
                    <span>"Завершить
                        интервью"</span> по нажатию которой видеозапись ответа завершится.
                </div>
                <div className="next_step">
                    <form id="fio" target="_blank" method="post">
                        <button className="start" id="start" onClick={this.createAction}>Начать интервью</button>
                    </form>
                </div> */}
            </div>
        )
    }
}
