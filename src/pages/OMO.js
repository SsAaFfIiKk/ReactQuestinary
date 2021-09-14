import "../css/OMO.css"
import React, { Component } from 'react'

export default class OMO extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [1],
            questions: ["Стремлюсь быть вместе со всеми."],
            answers: [["Обычно",
                "Часто",
                "Иногда",
                "По случаю",
                "Редко",
                "Никогда"]],
            error: null,
            values: {}
        };

        this.createQuestions = this.createQuestions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(event) {
        this.setState({ values: { ...this.state.values, [event.target.name]: event.target.value } })
    }

    componentDidMount() {
        fetch("http://10.64.34.105:8050/get_omo")
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


    sendData() {
        const link = 'http://10.64.34.105:8050/save_omo';
        const data = {
            "id_isu": localStorage.getItem("id"),
            "name": localStorage.getItem("name"),
            "surname": localStorage.getItem("surname"),
            "answers": this.state.values,
            "timestamp": new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
            "session_id": 123
        };

        console.log(data)
        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(link, body)
    }

    creteButtons(num, qwNum) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            buttons.push(<input
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
        console.log(this.state.questions.length)
        for (let i = 0; i < this.state.questions.length; i++) {
            questions.push(
                <div key={this.state.ids[i]}>
                    <div className="question">
                        {this.state.questions[i]}
                    </div>
                    <div className="buttons">
                        {this.creteButtons(this.state.answers[i].length, this.state.ids[i])}
                    </div>
                    <div className="buttonsLabels">
                        {this.state.answers[i]}
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
                <button onClick={this.sendData}>print</button>
            </div>
        )
    }

}