import React, { Component } from 'react'

export default class Kompetision extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            compitions: [],
            answers: [],
            is_qustoms: [],
            values: {},
            sesion: 69
        };

        this.createQuestions = this.createQuestions.bind(this);
        this.sendData = this.sendData.bind(this);
    }


    async componentDidMount() {
        const ses_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/create_session"
        const res = await fetch(ses_link, {
            method: "POST",
            body: JSON.stringify({
                "isu_id": localStorage.getItem("id"),
                "test_name": "competence"
            })
        })
        const out = await res.json();
        this.setState({ sesion: out })

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_competence_questions"
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
            "type": "competence"
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        console.log(data)
        fetch(save_link, body)
    };

    handleChange = ({ target: { checked, value } }) => {
        if (checked) {
            this.setState(({ values }) => ({ values: [...values, value] }));
        } else {
            this.setState(({ values }) => ({ values: values.filter(e => e !== value) }));
        }
    };

    createQuestions() {
        const questions = []
        for (let i = 0; i < this.state.compitions.length; i++) {
            questions.push(
                <div key={this.state.ids[i]} className="question">
                    <input type="checkbox" value={this.state.compitions[i]} onChange={this.handleChange}></input>{this.state.compitions[i]}
                </div>
            )
        }
        return questions
    }

    createComp() {
        const cname = document.getElementById("custom").value
        document.getElementsByClassName("question").appendChild = `<input type = "checkbox" value = ${ cname } onChange = { this.handleChange } ></input > ${ cname }`
    }
    
    render() {
        return (
            <div>
                <form>
                    {this.createQuestions()}
                </form>
                <button onClick={this.sendData}>Отпрпваить результаты</button>
                <input type="text" id="custom"></input>
                <button onClick={this.createComp}>Добавить свою тему</button>
            </div>
        )
    }
}
