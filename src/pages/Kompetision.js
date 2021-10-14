import React, { Component } from 'react'
import Modal from "../Modal"
import { Link } from "react-router-dom"
import Instructions from '../Instructions';


export default class Kompetision extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: [],
            answers: {},
            type: "competence",
            sesion: 69,
            activei: false,
            activee: false
        }

        this.createQuestions = this.createQuestions.bind(this);
        this.getAnswers = this.getAnswers.bind(this);
        this.sendData = this.sendData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.validData = this.validData.bind(this);
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

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_competence_questions"

        await fetch(get_link)
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {
                    const er = res.statusText;
                    return Promise.reject(er)
                }

                let answers = {}
                data.map(dict => {
                    answers[dict.id] = []
                })

                this.setState({
                    questions: data,
                    answers: answers
                })

            })
    }

    async sendData() {
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_competence"
        const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/start_compitence_interpritation"

        const data = {
            "answers": this.state.answers,
            "session_id": this.state.sesion,
            "type": this.state.type
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

    validData() {
        const selectedAnswers = document.querySelector('form').querySelectorAll('.question')
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let okays = []
        for (let selId in Array.from(selectedAnswers)) {
            let currentOk = false
            let selectedContainer = selectedAnswers[selId]
            let checkboxes = selectedContainer.querySelectorAll('.flags')
            for (let checkboxId in Array.from(checkboxes)) {
                if (checkboxes[checkboxId].checked) {
                    currentOk = true
                }
            }
            okays.push(currentOk)

        }

        if (okays.reduce(reducer) === Object.values(this.state.answers).length) {
            this.getAnswers()
            this.sendData()
        } else {
            alert('Вы ответили не на все вопросы!')
        }
        
    }

    getAnswers() {
        const selectedAnswers = document.querySelector('form').querySelectorAll('.question')
        let answers = this.state.answers
        
        for (let selId in Array.from(selectedAnswers)) {
            let selectedContainer = selectedAnswers[selId]
            let qId = selectedContainer.id
            let checkboxes = selectedContainer.querySelectorAll('.flags')
            
            for (let checkboxId in Array.from(checkboxes)) {
                if (checkboxes[checkboxId].checked) {
                    answers[qId].push(checkboxes[checkboxId].value)
                }
            }
        }
        this.setState({answers: answers})
    }

    updateVal(event) {
        const tar = event.target
        const check = "c" + document.getElementById(tar.id).id
        const box = document.getElementById(check)
        box.value = tar.value
        box.checked = true
    }

    createCheckBox(qw_id, answers, customs) {
        let buttons = []

        for (let i = 0; i < answers.length; i++) {
            let id = qw_id.toString() + i.toString()
            buttons.push(
                <div className="row">
                    <p>
                        <input
                            id={id}
                            className="flags"
                            type="checkbox"
                            value={answers[i]}
                        >
                        </input>
                        <label htmlFor={id}>{answers[i]}</label>
                    </p>
                </div>
            )
        }

        if (customs) {
            buttons.push(
                <div className="row">
                    <p>
                        <input id={"c" + qw_id} className="flags" type="checkbox"></input>
                        <label htmlFor={"c" + qw_id}>Свой вариант: </label>
                        <input id={qw_id} type="text" onChange={this.updateVal}></input>
                    </p>
                </div>
            )
        }

        return buttons
    }

    createQuestions() {
        const qw = this.state.questions
        const qwbloks = []
        for (let i = 0; i < qw.length; i++) {
            qwbloks.push(
                <div key={i} id={qw[i].id} className="question">
                    <div className="questionLabel">
                        {qw[i].q_text}
                    </div>
                    <div>
                        {this.createCheckBox(qw[i].id, qw[i].answers, qw[i].is_custom)}
                    </div>
                </div>
            )
        }
        return qwbloks
    }

    openModal() {
        this.setState({ activei: true })
    }

    openEND() {
        this.setState({ activee: true })
        this.props.updateTest()
    }

    closeModal() {
        this.setState({ activei: false })
    }


    render() {
        return (
            <div>
                <div className="float">
                    <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                </div>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    {Instructions.kompIns()}
                </Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <Modal active={this.state.activee} setActive={this.openEND}>
                    <p>Спасибо за прохождения теста. Теперь вам доступно заполнение анкеты.</p>
                    <Link to="/menu"> <button>На главную</button></Link>
                    <Link to='./ank'><button>Заполнить анкету</button></Link>
                </Modal>
                <button id="send" onClick={this.validData}>Отправить результаты</button>
            </div>
        )
    }
}
