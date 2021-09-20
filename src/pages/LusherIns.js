import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class LusherIns extends Component {

    render() {
        return (
            <div className="info">
                <p><span>Время прохождения не ограничено</span></p>
                <p>Тест Люшера с высокой степенью достоверности продиагностирует Ваше психофизиологическое состояние, стрессоустойчивость, активность и коммуникативные способности. Процедура тестирования состоит в упорядочивании цветов по степени их субъективной приятности. Тестирование проводится при естественном освещении -
                </p>
                <p>Вам необходимо отвлечься от ассоциаций, связанных с модой, традициями, общепринятыми вкусами и постараться выбирать цвета только исходя из своего личного отношения.
                </p>
                <p>Во время прохождения теста Вам необходимо выбрать из предложенных восьми цветов тот, который больше всего нравится. Вы должны выбрать цвет как таковой, не пытаясь соотнести его с любимым цветом в одежде, цветом глаз и т. п. Выберите наиболее приятный цвет из восьми и нажмите на него. После нажатия прямоугольник сменит цвет на белый. Повторяйте эту процедуру до тех пор, пока все прямоугольники не перекрасятся в белый. Затем повторите прохождение для второго набора карточек, представленного ниже.
                </p>
                <Link to='./luscher'><button onClick={this.getSesion}>Начать тест</button></Link>
            </div>
        )
    }
}