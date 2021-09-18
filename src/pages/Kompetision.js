import React, { Component } from 'react'
import Modal from "../Modal"
import { Link } from "react-router-dom"

export default class Kompetision extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            compitions: [],
            answers: [],
            is_qustoms: [],
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
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_competence"
        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": this.state.compitions
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        console.log(data)
        await fetch(save_link, body)
    };

    handleChange = ({ target: { checked, value } }) => {
        if (checked) {
            this.setState(({ values }) => ({ values: [...values, value] }));
        } else {
            this.setState(({ values }) => ({ values: values.filter(e => e !== value) }));
        }
    };

    updateVal(event) {
        const tar = event.target
        const check = "c" + document.getElementById(tar.id).id
        document.getElementById(check).value = tar.value
    }

    createCheckBox(num, qwNum, index) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            buttons.push(
                <div>
                    <p>{this.state.answers[index][i]}
                        <input
                            key={i + qwNum}
                            type="checkbox"
                            name={qwNum}
                            value={this.state.answers[index][i]}
                            onChange={this.handleChange}
                        ></input></p>
                </div>)
        }
        if (this.state.is_qustoms[index]) {
            buttons.push(<div>
                <p>Свой вариант:
                    <input id={index} type="text" onChange={this.updateVal}></input>
                    <input id={"c" + index} type="checkbox" onChange={this.handleChange}></input></p>
            </div>)
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
        this.setState({ active: true })
    }

    openEND() {
        this.setState({ active1: true })
        this.props.updateTest()
    }


    closeModal() {
        this.setState({ active: false })
    }

    render() {
        return (
            <div>
                <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                <Modal active={this.state.active} setActive={this.closeModal}>
                    <p><span>Время прохождения не ограничено</span></p>
                    <p>Настоящее тестирование предназначено для определения сферы научных интересов. Результаты, полученные в ходе данного тестирования, будут влиять на порядок расположения тем научных работ в перечне, предложенном испытуемому.
                    </p>
                </Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <Modal active={this.state.active1} setActive={this.openEND}><Link to='/menu'><button>На главную</button></Link></Modal>
                <button onClick={this.sendData, this.openEND}>Отпрпваить результаты</button>
            </div>
        )
    }
}
