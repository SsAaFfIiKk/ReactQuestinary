import React, { Component } from 'react'
// import Timer from "../Timer"

export default class Zaslon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ids: [],
            questions: [],
            answers: [],
            values: {},
            sesion: 69,
            time: {},
            seconds: 5
        };

        this.timer = 0;
        // this.countDown = this.countDown.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
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
                "test_name": "zaslon"
            })
        })
        
        const out = await res.json();
        this.setState({ sesion: out })

        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_zaslon_questions"
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
    }

    async sendData() {
        // const iter_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/calculate_answers_degree"
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/save_zaslon"

        const data = {
            "answers": this.state.values,
            "session_id": this.state.sesion,
            "type": "zaslon"
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(save_link, body)
        // fetch(iter_link, body)
    };

    // secondsToTime(secs) {
    //     let hours = Math.floor(secs / (60 * 60));

    //     let divisor_for_minutes = secs % (60 * 60);
    //     let minutes = Math.floor(divisor_for_minutes / 60);

    //     let divisor_for_seconds = divisor_for_minutes % 60;
    //     let seconds = Math.ceil(divisor_for_seconds);

    //     let obj = {
    //         "h": hours,
    //         "m": minutes,
    //         "s": seconds
    //     };
    //     return obj;
    // }

    // componentDidMount() {
    //     let timeLeftVar = this.secondsToTime(this.state.seconds);
    //     this.setState({ time: timeLeftVar });
    //     if (this.timer == 0 && this.state.seconds > 0) {
    //         this.timer = setInterval(this.countDown, 1000);
    //     }
    // }

    // countDown() {
    //     // Remove one second, set state so a re-render happens.
    //     let seconds = this.state.seconds - 1;
    //     this.setState({
    //         time: this.secondsToTime(seconds),
    //         seconds: seconds,
    //     });

    //     // Check if we're at zero.
    //     if (seconds == 0) {
    //         clearInterval(this.timer);
    //     }
    // }

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

    render() {
        return (
            <div>
                {/* <Timer/> */}
                <form onSubmit={this.sendData}>
                    {this.createQuestions()}
                </form>
                <button onClick={this.sendData}>Отпрпваить результаты</button>
            </div>
        )
    }
}
