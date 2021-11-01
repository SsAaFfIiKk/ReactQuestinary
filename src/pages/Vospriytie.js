import React, { Component } from 'react'
import Modal from "../Modal"
import { Link } from "react-router-dom"
import Instructions from '../Instructions';

export default class Vospriytie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
            answers: null,
            sesion: 69,
            type: "self_perception",
            activei: false,
            activee: false
        }

        this.validForm = this.validForm.bind(this);
        this.sendData = this.sendData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    sumAnswers = (array) => array.reduce((prev, cur) => Number(prev) + Number(cur))

    async componentDidMount() {
        const sessionLink = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
        const sessionRes = await fetch(sessionLink, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": this.state.type
            })
        })
        const sessionId = await sessionRes.json();

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_sperseption_questions"
        const res = await fetch(get_link);
        const data = await res.json()
        const answers = data.map(question => ({
            id: question.id,
            max: 10,
            left: 10,
            answers: Object.keys(question.answers).map(_ => 0)
        }))
        this.setState({
            questions: data,
            answers: answers,
            sesion: sessionId
        })
    }

    async sendData() {
        document.getElementById('send').onClick = ""
        const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/self_perception_calculate"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_sperseption"

        const answers = {}
        this.state.answers.forEach(answerObj => answers[answerObj.id] = answerObj.answers.map(answer => Number(answer)))
        console.log(answers)

        const data = {
            "answers": answers,
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
        this.openEND();
    }

    validForm() {
        for (let answer of this.state.answers) {
            if (this.sumAnswers(answer.answers) < answer.max) {
                alert('Вы распределили не все очки!')
                return
            }
        }
        this.sendData()
    }

    handleChange = (answer, questionIdx, answerIdx) => {
        let currentAnswers = [...this.state.answers]
        const currentAnswer = currentAnswers[questionIdx]

        currentAnswer.answers[answerIdx] = Number(answer) ? answer : 0
        currentAnswer.answers[answerIdx] = this.sumAnswers(currentAnswer.answers) > currentAnswer.max ? 0 : answer

        currentAnswers[questionIdx] = currentAnswer
        this.setState({ answers: currentAnswers })
    }

    checkInputKey = (e) => {
        const rule = /[0-9]|Backspace|Delete|ArrowRight|ArrowLeft|Tab/;
        if (!e.key.match(rule)) e.preventDefault();
    }

    createQuestions() {
        const questions = this.state.questions.map((question, questionIdx) => (
            <div key={question.id} className='question'>
                <div className='questionLabel'>
                    {question.text}
                </div>
                <div>
                    {Object.keys(question.answers).map((answerId, answerIdx) => (
                        <div className='row'>
                            <p>
                                <input
                                    type='number'
                                    key={questionIdx + answerIdx}
                                    id={question.id}
                                    min={0}
                                    max={this.state.answers[questionIdx].max}
                                    name={answerId}
                                    value={this.state.answers[questionIdx].answers[answerIdx]}
                                    onChange={e => this.handleChange(e.target.value, questionIdx, answerIdx)}
                                    onKeyDown={e => this.checkInputKey(e)}
                                >
                                </input>
                            </p>
                            <div>
                                {question.answers[answerId]}
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        ))
        return questions
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
                    {Instructions.vosIns()}
                </Modal>
                <form>
                    {this.state.questions && this.createQuestions()}
                </form>
                <Modal active={this.state.activee} setActive={this.openEND}>
                    <p>Спасибо за прохождение теста. Теперь вам доступен тест "Межличностные отношения".</p>
                    <Link to="/menu"> <button>На главную</button></Link>
                    <Link to='./omoins'><button>Следующий тест</button></Link>
                </Modal>
                <button id="send" onClick={this.validForm}>Отправить результаты</button>
            </div>
        )
    }
}