import React, { Component } from 'react'
import Timer from "../Timer"
import Modal from "../Modal"
import { Link } from "react-router-dom"

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
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

        console.log(data)
        fetch(save_link, body)
        this.openEND(   )
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

    openModal() {
        this.setState({ activei: true })
    }

    openEND() {
        this.setState({ activee: true})
    }


    closeModal() {
        this.setState({ activei: false })
    }

    render() {
        return (
            <div>
                <Timer send={this.sendData} open={this.openEND} stop={false}/>
                <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    <p><span>Ограничение по времени: 15 минут</span></p>
                    В этой брошюре содержатся вопросы, цель которых выяснить Ваши взгляды и интересы,что крайне важно для командной работы.
                    <br />
                    Отвечая на вопрос, Вы можете выбрать только один из четырех предложенных вариантов ответов.
                    <br /></Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <button onClick={this.sendData}>Отпрпваить результаты</button>
                <Modal active={this.state.activee} setActive={this.openEND}><Link to='./luscherins'><button>Следующий тест</button></Link></Modal>
            </div>
        )
    }
}
