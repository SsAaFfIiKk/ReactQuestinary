import "../css/OMO.css"
import React, { Component } from 'react'

export default class OMO extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            questions: [],
            answers: [],
            error: null,
            values: {},
            sesion: 69
        };

        this.createQuestions = this.createQuestions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(event) {
        this.setState({ values: { ...this.state.values, [event.target.name]: event.target.value } })
    }

    async componentDidMount() {
        const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
        // const ses_link = "http://10.64.34.105:8050/create_session"
        const res = await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": "omo"
            })
        })
        const out = await res.json();
        console.log(out)
        this.setState({ sesion: out })
        

        // const get_link = "http://10.64.34.105:8050/get_omo"
        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_omo"
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

            .catch(error => {
                this.setState({ error: error.toString() });
                console.error('There was an error!', error);
            });
    }

    async sendData() {
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_omo"
        // const save_link = 'http://10.64.34.105:8050/save_omo';
        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": "omo"
        };

        console.log(data)
        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(save_link, body)
    }

    creteButtons(num, qwNum) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            buttons.push(<input
                className = "radio"
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
                <form onSubmit={this.sendData}>
                    {this.createQuestions()}
                </form>
                <button onClick={this.sendData}>Отпрпваить результаты</button>
            </div>
        )
    }

}