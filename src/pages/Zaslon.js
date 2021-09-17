import React, { Component } from 'react'
import Timer from "../Timer"
import Modal from "../Modal"

export default class Zaslon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            questions: [],
            answers: [],
            values: {},
            sesion: 69,
            activei: false,
            activee: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(event) {
        this.setState({ values: { ...this.state.values, [event.target.name]: event.target.value } })
    }

    async componentDidMount() {
        const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"

        const res = await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": "zaslon"
            })
        })

        const out = await res.json();
        this.setState({ sesion: out })

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_zaslon_questions"
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
                        questions: [...this.state.questions, data[i]["text"]],
                        answers: [...this.state.answers, Object.values(data[i]["answers"])]
                    })
                }
            })
    }

    async sendData() {
        // const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/calculate_answers_degree"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_zaslon"

        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": "zaslon"
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(save_link, body)
        // fetch(iter_link, body)
    };

    creteButtons(num, qwNum) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            buttons.push(<input
                className="radio"
                key={i + qwNum}
                type="radio"
                name={qwNum}
                value={i}
                onChange={this.handleChange}
            ></input>)
        }
        return buttons
    }

    createQuestions() {
        const questions = []
        for (let i = 0; i < this.state.questions.length; i++) {
            const blabels = this.state.answers[i]
            questions.push(
                <div key={this.state.ids[i]} className="question">
                    <div className="questionLabel">
                        {this.state.questions[i]}
                    </div>
                    <div className="buttons">
                        {this.creteButtons(this.state.answers[i].length, this.state.ids[i])}
                    </div>
                    <div className="buttonsLabels">
                        {blabels.map((blabels) => <p>{blabels}</p>)}
                    </div>
                </div>
            )
        }
        return questions
    }

    render() {
        return (
            <div>
                <Timer send={this.sendData} />
                <button onClick={this.openModal}>Инструкция</button>
                <Modal active={this.state.active} setActive={this.closeModal}>  Опросник межличностных ориентаций предназначен для оценки типичных способов Вашего взаимодействия с коллегами. В сущности, здесь нет правильных и неправильных ответов, правилен каждый правдивый ответ. Иногда люди стремятся отвечать на вопросы так, как, по их мнению, они должны были бы себя вести. Однако в данном случае нас интересует, как Вы ведете себя при взаимодействии с коллективом. Некоторые вопросы очень похожи друг на друга. Но все-таки они подразумевают разные вещи. Отвечайте, пожалуйста, на каждый вопрос отдельно, без оглядки на другие вопросы. Время ответа на вопросы не ограничено, но не размышляйте слишком долго над отдельными вопросами.
                </Modal>
                <form>
                    {this.createQuestions()}
                    <button onClick={this.sendData}>Отпрпваить результаты</button>
                </form>
                <Modal active={this.state.active1} setActive={this.openEND}><Link to='/menu'><button>На главную</button></Link></Modal>
                <button onClick={this.sendData, this.openEND}>Отпрпваить результаты</button>
            </div>
        )
    }
}
