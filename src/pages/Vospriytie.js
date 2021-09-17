import React, { Component } from 'react'
import Modal from "../Modal"

export default class Vospriytie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            questions: [],
            answers: [],
            count: [],
            values: {},
            sesion: 69,
            type: "self_perception"
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(event) {
        var value_id = event.target.name
        var id = Number(event.target.id) + 1

        if ((this.state.values[value_id][id] !== 0) && (this.state.values[value_id][id] > event.target.value)) {
            this.state.values[value_id][id] -= 1
            this.state.values[value_id][0] -= 1
        } else if (this.state.values[value_id][0] >= 10) {
            event.target.value -= 1
        } else if ((Number(this.state.values[value_id][id]) === 0) && (Number(event.target.value) === 0)) {
            event.target.value = 0
        } else {
            this.state.values[value_id][0] += 1
            this.state.values[value_id][id] += 1
        }
    }

    async componentDidMount() {
        const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
        const res = await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": this.state.type
            })
        })
        const out = await res.json();
        this.setState({ sesion: out })

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_sperseption_questions"
        fetch(get_link)
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {
                    const er = res.statusText;
                    return Promise.reject(er)
                }

                for (let i in data) {
                    this.setState({
                        ids: [...this.state.ids, data[i]["id"]],
                        count: [...this.state.count, 10],
                        values: { ...this.state.values, [data[i]["id"]]: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        questions: [...this.state.questions, data[i]["text"]],
                        answers: [...this.state.answers, Object.values(data[i]["answers"])]
                    })
                }
            })
    }

    sendData() {
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_sperseption"

        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": this.state.type
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(save_link, body)
    }

    creteButtons(num, qwNum, index) {
        let buttons = []
        let blabels = this.state.answers[index]
        for (let i = 0; i < num; i++) {
            buttons.push(
                <div>
                    <p>{blabels[i]}
                        <input
                            key={i + qwNum}
                            type="number"
                            name={qwNum}
                            id={i}
                            min="0"
                            placeholder="0"
                            max="10"
                            onChange={this.handleChange}
                            onKeyDown={(event) => {
                                event.preventDefault();
                            }}
                        ></input></p>
                </div>)
        }
        return buttons
    }

    createQuestions() {
        const questions = []

        for (let i = 0; i < this.state.questions.length; i++) {
            const bbuttoms = this.creteButtons(this.state.answers[i].length, this.state.ids[i], i)
            questions.push(
                <div key={this.state.ids[i]} className="question">
                    <div className="questionLabel">
                        {this.state.questions[i]}
                    </div>
                    <div>
                        {bbuttoms}
                    </div>
                </div>
            )
        }
        return questions
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.openModal}>Инструкция</button>
                    <Modal active={this.state.active} setActive={this.closeModal}>  Опросник межличностных ориентаций предназначен для оценки типичных способов Вашего взаимодействия с коллегами. В сущности, здесь нет правильных и неправильных ответов, правилен каждый правдивый ответ. Иногда люди стремятся отвечать на вопросы так, как, по их мнению, они должны были бы себя вести. Однако в данном случае нас интересует, как Вы ведете себя при взаимодействии с коллективом. Некоторые вопросы очень похожи друг на друга. Но все-таки они подразумевают разные вещи. Отвечайте, пожалуйста, на каждый вопрос отдельно, без оглядки на другие вопросы. Время ответа на вопросы не ограничено, но не размышляйте слишком долго над отдельными вопросами.
                    </Modal>
                    <form>
                        {this.createQuestions()}
                    </form>
                    <Modal active={this.state.active1} setActive={this.openEND}><Link to='/menu'><button>На главную</button></Link></Modal>
                    <button onClick={this.sendData, this.openEND}>Отпрпваить результаты</button>
                </div>
            </div>
        )
    }
}
