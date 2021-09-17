import React, { Component } from 'react'
import Timer from "../Timer";

export default class Vospriytie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: [],
            ids: [],
            questions: [],
            answers: [],
            values: {},
            sesion: 69
        }

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        var value_id = event.target.name
        var id = Number(event.target.id) + 1

        if ((this.state.values[value_id][id] !== 0) && (this.state.values[value_id][id] > event.target.value)) {
            this.state.values[value_id][id] -= 1
            this.state.values[value_id][0] -= 1
        } else if (this.state.values[value_id][0] >= 10) {
            event.target.value -= 1
        } else if ((Number(this.state.values[value_id][id]) === 0) && (Number(event.target.value) === 0)) {
            event.target.value = 0
        } else {
            this.state.values[value_id][0] += 1
            this.state.values[value_id][id] += 1
            // event.target.value = this.state.values[value_id][id]
        }

        console.log(this.state.values)
    }

    async componentDidMount() {
        const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
        // const ses_link = "http://10.64.34.105:8050/create_session"
        const res = await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": "vospriytie"
            })
        })
        const out = await res.json();
        console.log(out)
        this.setState({ sesion: out })

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_sperseption_questions"
        // const get_link = "http://10.64.34.105:8050/get_omo"
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
                        count: [...this.state.count, 10],
                        values: {...this.state.values, [data[i]["id"]]: [0,0,0,0,0,0,0,0,0]},
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


    creteButtons(num, qwNum, index) {
        let buttons = []
        let blabels = this.state.answers[index]
        for (let i = 0; i < num; i++) {
            buttons.push(
            <div>
                <p>{blabels[i]}
                <input
                    key={i + qwNum}
                    type="number"
                    name={qwNum}
                    id={i}
                    min="0"
                    placeholder="0"
                    max="10"
                    onChange={this.handleChange}
                    onKeyDown={(event) => {
                                  event.preventDefault();
                                }}
                ></input></p>
            </div>)
        }
        return buttons
    }

    createQuestions() {
        const questions = []

        for (let i = 0; i < this.state.questions.length; i++) {
            // const blabels = this.state.answers[i]
            const bbuttoms = this.creteButtons(this.state.answers[i].length, this.state.ids[i], i)
            questions.push(
                <div key={this.state.ids[i]} className="question">
                    <div className="questionLabel">
                        {this.state.questions[i]}
                    </div>
                    <div>
                        {bbuttoms}
                        {/*{blabels.map((blabels) => <p>{blabels}</p>)}*/}
                        {/*{bbuttoms.map((bbuttoms) => <p>{bbuttoms}</p>)}*/}
                    </div>
                </div>
            )
        }
        return questions
    }

    render() {
        return (
            <div>
                <Timer />
                <form onSubmit={this.sendData}>
                    {this.createQuestions()}
                </form>
                <button onClick={this.sendData}>Отправить результаты</button>
            </div>
        )
    }
}
