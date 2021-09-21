import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Modal from "../Modal"
import Instructions from '../Instructions';

export default class Big5 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            questions: [],
            answers: [],
            values: [],
            sesion: 69,
            type: "big5",
            activei: false,
            activee: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(event) {
        const id = event.target.id
        const val = event.target.value
        const newVal = this.state.values
    
        newVal[id] = Number(val)
        this.setState({ values: newVal })
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

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_big5_questions"
        await fetch(get_link)
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {
                    const er = res.statusText;
                    return Promise.reject(er)
                }

 
                this.setState({
                    ids: data["id"],
                    questions: data["q_text"],
                    answers: Object.values(data["answers"]),
                    values: new Array(data["answers"].length).fill(1)
                })

                // for (let i in data) {
                //     this.setState({
                //         ids: [...this.state.ids, data[i]["id"]],
                //         questions: [...this.state.questions, data[i]["q_text"]],
                //         answers: [...this.state.answers, Object.values(data[i]["answers"])]
                //     })
                // }
            })
    }

    async sendData() {
        // const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/calculate_answers_degree"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_big5"

        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": this.state.type
        };

        console.log(data)
        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        await fetch(save_link, body)
        // await fetch(iter_link, body)
        this.openEND()
    };

    createNumbers() {
        let buttons = []
        let blabels = this.state.answers
        for (let i = 0; i < this.state.answers.length; i++){
            buttons.push(
                <div className="row">
                    <p>
                        <input
                            key={"0" + i}
                            type="number"
                            id={i}
                            name="1"
                            defaultValue="1"
                            min="1"
                            max="7"
                            onChange={this.handleChange}
                            onKeyDown={(event) => {
                                event.preventDefault();
                            }}
                        >
                        </input>
                        {blabels[i]}
                    </p>
                </div>
            )
        }
        return buttons
    }

    createQuestions() {
        const qw = []
        const butons = this.createNumbers()
        qw.push(
            <div key={this.state.ids[0]} className="question">
                <div className="questionLabel">
                    {this.state.questions}
                </div>
                <div>
                    {butons}
                </div>
            </div>
            )
        return qw
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
                    {Instructions.bigIns()}
                </Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <Modal active={this.state.activee} setActive={this.openEND}>
                    Спасибо за прохождение теста. Теперь вам доступен тест "Моя роль в команде".
                    <br />
                    <Link to='./vosins'><button>Следующий тест</button></Link>
                </Modal>
                <button onClick={this.sendData}>Отпрпваить результаты</button>
            </div>
        )
    }
}