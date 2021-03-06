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
        this.validForm = this.validForm.bind(this);
        this.sendData = this.sendData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(event) {
        if (event.target.value > 7) event.target.value = 7
        let val = event.target.value
        const id = event.target.id
        const newVal = this.state.values
        newVal[id] = Number(val)
        this.setState({ values: newVal })
    }

    async componentDidMount() {
        const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_big5_questions"
        
        const res = await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": this.state.type
            })
        })
        
        const out = await res.json();
        
        await fetch(get_link)
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {
                    const er = res.statusText;
                    return Promise.reject(er)
                }
                
                this.setState({
                    sesion: out,
                    ids: data["id"],
                    questions: data["q_text"],
                    answers: Object.values(data["answers"]),
                    values: new Array(data["answers"].length).fill(1)
                })
            })
    }

    async sendData() {
        document.getElementById('send').onClick = ""
        const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/start_big5_intepritation"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_big5"

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
        await fetch(iter_link, {
            method: "POST",
            body: JSON.stringify({ "session_id": this.state.sesion })
        })

        this.openEND()
    };

    validForm() {
        const values = this.state.values
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let sum = 0;
        sum += values.reduce(reducer)
        if (sum <= this.state.answers.length) {
            alert("???????? ???? ???????? ?????????????????????? ???????????? ???????? ???????????? 1")
        }
        else (
            this.sendData()
        )
    }

    createNumbers() {
        let buttons = []
        let blabels = this.state.answers
        for (let i = 0; i < this.state.answers.length; i++) {
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
                    <button className="insbutton" onClick={this.openModal}>????????????????????</button>
                </div>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    {Instructions.bigIns()}
                </Modal>
                <form>
                    {this.createQuestions()}
                </form>
                <Modal active={this.state.activee} setActive={this.openEND}>
                    <p>?????????????? ???? ?????????????????????? ??????????. ???????????? ?????? ???????????????? ???????? "?????? ???????? ?? ??????????????".</p>
                    <Link to="/menu"> <button>???? ??????????????</button></Link>
                    <Link to='./vosins'><button>?????????????????? ????????</button></Link>
                </Modal>
                <button id="send" onClick={this.validForm}>?????????????????? ????????????????????</button>
            </div>
        )
    }
}
