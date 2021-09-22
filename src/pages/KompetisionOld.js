import React, { Component } from 'react'
import Modal from "../Modal"
import { Link } from "react-router-dom"
import Instructions from '../Instructions';

export default class Kompetision extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            compitions: [],
            answers: [],
            is_qustoms: [],
            customAnswers: [],
            values: {},
            sesion: 69,
            type: "competence",
            activei: false,
            activee: false
        };

        this.createQuestions = this.createQuestions.bind(this);
        this.sendData = this.sendData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateVal = this.updateVal.bind(this);
        this.validForm = this.validForm.bind(this)
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

                for (let i in data) {
                    this.setState({
                        ids: [...this.state.ids, data[i]["id"]],
                        compitions: [...this.state.compitions, data[i]["q_text"]],
                        answers: [...this.state.answers, data[i]["answers"]],
                        is_qustoms: [...this.state.is_qustoms, data[i]["is_custom"]]
                    })
                }
            })
    }

    async sendData() {
        const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/start_compitence_interpritation"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_competence"
        
        const data = {
            "answers": this.normalizeResults(),
            "session_id": this.state.sesion,
            "type": this.state.type
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        // console.log(data)
        await fetch(save_link, body)
        await fetch(iter_link, {
            method: "POST",
            body: JSON.stringify({ "session_id": this.state.sesion })
        })

        this.openEND()
    };

    normalizeResults() {
        let answers = {};
        let answersList = [];
        let oldAnswers = this.state.values;
        oldAnswers.forEach((dict) => {
            if (Object.keys(dict)[0].substring(0, 1) === 'c') {
                let key = Object.keys(dict)[0].substring(1, Object.keys(dict)[0].length)
                answers[key] = dict[Object.keys(dict)[0]]
            }
            else {
                answersList.push(dict)
            }
        })
        for (let key in answers) {
            answersList.push({[key]: answers[key]})
        }
        return answersList
    }

    handleChange(event) {
        if (event.target.checked) {
            this.setState({ values: [...this.state.values, { [event.target.name]: event.target.value }] });
        }
        else {
            const newVal = this.state.values
            const todelete = { [event.target.name]: event.target.value }
            this.setState({ values: newVal })

        }
    };

    updateVal(event) {
        const tar = event.target
        const check = "c" + document.getElementById(tar.id).id
        const box = document.getElementById(check)
        box.value = tar.value
        box.checked = true
        this.setState({ values: [...this.state.values, { ["c" + box.name]: box.value }] });
    }

    validForm() {
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const qw = document.getElementsByClassName("question")

        for (let i in Array.from(qw)) {
            let checkboxs = Array.from(qw[i].getElementsByClassName("flags"))
            let flags = checkboxs.map(box => box.checked)
            if (flags.reduce(reducer) === 0) {
                alert("Вам нужно выбрать хотя бы один флаг в каждом вопросе")
                return
            }
        }
        this.sendData()
    }

    createCheckBox(num, qwNum, index) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            let id = num.toString() + i.toString() + qwNum.toString()
            buttons.push(
                <div className="row">
                    <p>
                        <input
                            id={id}
                            className="flags"
                            key={id}
                            type="checkbox"
                            name={qwNum}
                            value={this.state.answers[index][i]}
                            onChange={this.handleChange}>
                            </input>
                        <label htmlFor={id}>{this.state.answers[index][i]}</label></p>
                </div>)
        }
        if (this.state.is_qustoms[index]) {
            buttons.push(
                <div className="row">
                    <p>
                        <input className="flags" id={"c" + index} name={qwNum} value="" type="checkbox" onChange={this.handleChange}></input>
                        <label htmlFor={"c" + index}>Свой вариант: </label>
                        <input id={index} type="text" onChange={this.updateVal}></input>
                    </p>
                </div>
            )
        }
        return buttons
    }

    createQuestions() {
        const questions = []
        for (let i = 0; i < this.state.compitions.length; i++) {
            const buttons = this.createCheckBox(this.state.answers[i].length, this.state.ids[i], i)
            questions.push(
                <div key={this.state.ids[i]} className="question">
                    <div className="questionLabel">
                        {this.state.compitions[i]}
                    </div>
                    <div>
                        {buttons}
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
                    <p>Вы прошли все тесты, спасибо</p>
                    <Link to='/menu'><button>На главную</button></Link>
                </Modal>
                <button onClick={this.sendData}>Оправить результаты</button>
            </div>
        )
    }
}
