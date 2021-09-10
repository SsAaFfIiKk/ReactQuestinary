import "./css/OMO.css"
import React, { Component } from 'react'


export default class OMO extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            surname: null,
            ids: [1],
            questions: ["Стремлюсь быть вместе со всеми."],
            answers: [["Обычно",
                "Часто",
                "Иногда",
                "По случаю",
                "Редко",
                "Никогда"]],
            error: null,
        };

        this.createQuestions = this.createQuestions.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData() {
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

    creteButtons(num, qwNum) {
        let buttons = []
        for (let i = 0; i < num; i++) {
            buttons.push(<input type="radio" value={qwNum}></input>)
        }

        return buttons
    }

    createQuestions() {
        // this.getData()
        const questions = []

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
            <form className="firstQuestions">
                {this.createQuestions()}
            </form>
        )
    }

}
