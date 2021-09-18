import "../css/OMO.css"
import React, { Component } from 'react'
import {Link} from "react-router-dom"
import Modal from "../Modal"

export default class OMO extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            questions: [],
            answers: [],
            values: {},
            sesion: 69,
            type: "omo",
            activei: false,
            activee: false
        };

        this.createQuestions = this.createQuestions.bind(this);
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
                "test_name": this.state.type
            })
        })
        const out = await res.json();
        this.setState({ sesion: out })

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_omo"
        
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
        const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/calculate_answers_degree"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_omo"

        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": this.state.type
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        await fetch(save_link, body)
        await fetch(iter_link, body)
        this.openEND()
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

    // createButtons(num, qwNum, index) {
    //     let buttons = []
    //     for (let i = 0; i < num; i++) {
    //         buttons.push(
    //             <div>
    //                 <p>{this.state.answers[index][i]}
    //                     <input
    //                         key={i + qwNum}
    //                         type="radio"
    //                         name={qwNum}
    //                         value={i}
    //                         onChange={this.handleChange}
    //                     ></input></p>
    //             </div>)
    //     }
    //     return buttons
    // }

    // createQuestions() {
    //     const question = []
    //     for (let i = 0; i < this.state.questions.length; i++) {
    //         const buttons = this.createButtons(this.state.answers[i].length, this.state.ids[i], i)
    //         question.push(
    //             <div key={this.state.ids[i]} className="question">
    //                 <div className="questionLabel">
    //                     {this.state.questions[i]}
    //                 </div>
    //                 <div>
    //                     {buttons}
    //                 </div>
    //             </div>
    //         )
    //     }
    //     return question
    // }

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
                <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    <p><span>Время прохождения не ограничено</span></p>
                    <p>
                        Опросник межличностных ориентаций предназначен для оценки типичных способов Вашего взаимодействия с коллегами. В сущности, здесь нет правильных и неправильных ответов, правилен каждый правдивый ответ. Иногда люди стремятся отвечать на вопросы так, как, по их мнению, они должны были бы себя вести.Некоторые вопросы очень похожи друг на друга. Но все-таки они подразумевают разные вещи. Отвечайте, пожалуйста, на каждый вопрос отдельно, без оглядки на другие вопросы. Время ответа на вопросы не ограничено, но не размышляйте слишком долго над отдельными вопросами.
                    </p>
                </Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <Modal active={this.state.activee} setActive={this.openEND}><Link to='/menu'><button>На главную</button></Link></Modal>
                <button onClick={this.sendData}>Отпрпваить результаты</button>
            </div>
        )
    }

}