import React, { Component } from 'react'
import Timer from "../Timer"
import Modal from "../Modal"
import { Link } from "react-router-dom"
import Instructions from '../Instructions'

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

        this.child = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.validForm = this.validForm.bind(this)
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
        await fetch(get_link)
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
        const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/start_zaslone_interpritation"
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

        await fetch(save_link, body)
        await fetch(iter_link, {
            method: "POST",
            body: JSON.stringify({ "session_id": this.state.sesion })
        })
        
        this.openEND()
    };

    validForm() {
        if (this.state.answers.length === this.state.values.length) {
            this.sendData()
        }
        else {
            alert("Вы ответили не на все вопросы!")
        }
    }

    creteButtons(num, qwNum, labels) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            let id = num.toString() + i.toString() + qwNum.toString()
            buttons.push(
                <div className="radiobutton">
                    <input
                        className="radio"
                        id={id}
                        key={i + qwNum}
                        type="radio"
                        name={qwNum}
                        value={i}
                        onChange={this.handleChange}></input>
                    <label htmlFor={id}>{labels[i]}</label>
                </div>
            )
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
                        {this.creteButtons(this.state.answers[i].length, this.state.ids[i], blabels)}
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
        this.setState({ activee: true })
        this.child.current.stopTimer()
        this.props.updateTest()
    }

    closeModal() {
        this.setState({ activei: false })
    }

    render() {
        return (
            <div>
                <div className="float">
                    <Timer ref={this.child} send={this.sendData} open={this.openEND} />
                    <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                </div>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    {Instructions.zaslonIns()}
                </Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <button onClick={this.validForm}>Отпрпваить результаты</button>
                <Modal active={this.state.activee} setActive={this.openEND}>
                    Спасибо за прохождение теста. Теперь вам доступен тест "Мои состояния и особенности".
                    <br />
                    <Link to='./luscherins'><button>Следующий тест</button></Link>
                </Modal>
            </div>
        )
    }
}
