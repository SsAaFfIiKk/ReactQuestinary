import React, { Component, createRef } from 'react'
import io from 'socket.io-client/dist/socket.io.js';
import Modal from "../Modal"
import Instructions from '../Instructions';
import { Link } from "react-router-dom"
import check from "../img/check.svg"
import crest from "../img/crest.svg"

export default class inter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rec_id: 69,
            question: [{ "text": "Загружаем вопросы" }],
            timestamps: [],
            active: false,
            count: 0,
            btnTxt: "Cледующий вопрос"
        }
        this.constraints = {
            video: {
                width: {
                    min: 320,
                    ideal: 640,
                    max: 640
                },
                height: {
                    min: 240,
                    ideal: 480,
                    max: 480
                }
            }, audio: true
        }

        this.video = createRef();
        this.socket = null
        this.filename = null

        this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getVideo = this.getVideo.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEND = this.openEND.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateCount = this.updateCount.bind(this);
    }

    componentDidMount() {
        if(!this.props.available) return;
        this.getData()
        this.socket = io("https://mycandidate.onti.actcognitive.org", {path: '/questionnaires/inter_backend/socket.io'})
        this.getVideo()
    }

    componentWillUnmount() {
        this.turnof()
    }

    async getData() {
        // const qw_link = "http://127.0.0.1:5555/get_user_quest"
        // const id_link = "http://127.0.0.1:5555/get_record_id"
        const qw_link = "https://mycandidate.onti.actcognitive.org/questionnaires/quest_backend/get_user_quest"
        const id_link = "https://mycandidate.onti.actcognitive.org/questionnaires/quest_backend/get_record_id"

        const body = JSON.stringify({
            "isu_id": localStorage.getItem("id")
        })

        const r = await fetch(id_link, {
            method: "POST",
            body: body
        })
        const o = await r.json()
        
        const res = await fetch(qw_link, {
            method: "POST",
            body: body
        })
        const out = await res.json()

        this.setState({
            rec_id: o,
            question: out,
            active: out[0][3] ? true : false
        })
        this.filename = `${localStorage.getItem("id")}_${this.state.rec_id}`;
    }

    async sendData() {
        this.setState({btnTxt: "Сохраняем..."})
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/quest_backend/save_answers"

        const data = {
            rec_id: this.state.rec_id,
            file_name: this.filename,
            answers: this.state.timestamps
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        await fetch(save_link, body)
        setTimeout(() => { this.turnof(), this.openEND() }, 2000)
    };

    getVideo() {
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia(this.constraints)
                .then((stream) => {
                    this.video.current.srcObject = stream;
                    this.video.current.play();
                    this.recordVideo(stream);
                })
                .catch((error) => {
                    console.log(error);
                    alert('Устройство видеозаписи недоступно');
                });
        }
    }

    recordVideo(stream) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(1000);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.socket.emit('recorded-chunk', {
                    filename: this.filename,
                    chunk: event.data,
                });
            }
        };
    }

    openModal() {
        this.setState({ activei: true })
    }

    openEND() {
        this.setState({ activee: true, btnTxt: "Готово" })
    }

    closeModal() {
        this.setState({ activei: false })
    }

    turnof() {
        const videoElement = this.video.current;
        if (videoElement) {
            const stream = videoElement.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
            }

            videoElement.srcObject = null;
            this.socket.disconnect()
        }
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    getTime() {
        let data = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const dct = { [this.state.question[this.state.count][0]]: data, "lie": this.state.question[this.state.count][2]}
        this.setState({ timestamps: [...this.state.timestamps, dct] })
    }

    updateCount() {
        this.getTime()
        let count = this.state.count
        count++
        if (this.state.question[count][2] !== this.state.question[count - 1][2]) {
            this.toggleClass()
        }
        this.setState({ count: count })
        if (count ===this.state.question.length -1 ) {
            this.setState({ btnTxt: "Закончить интервью" })
        }
    }

    render() {
        if(!this.props.available) return ('');
        return (
            <div>
                <div className="float">
                    <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                </div>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    {Instructions.interIns()}
                </Modal>
                <div className="top">
                    <div className="video">
                        <video ref={this.video} muted>Устройство видеозаписи недоступно</video>
                    </div>
                    <div className="labels-container">
                        <div>
                            <div className={!this.state.active ? "truth" : "disabled"}>
                                <img src={check} alt=""></img>
                                <label>скажите правду</label>
                            </div>
                            <div className={this.state.active ? "lie" : "disabled"}>
                                <img src={crest} alt=""></img>
                                <label>соврите</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="interLabel">
                        <label>{this.state.question[this.state.count][1]}</label>
                    </div>
                    <div className="changeQw">
                        <button className="nextQw" id="nextQw" onClick={this.state.count === this.state.question.length - 1 ? this.sendData : this.updateCount}>{this.state.btnTxt}</button>
                    </div>
                </div>
                <Modal active={this.state.activee} setActive={this.openEND}>
                    <p>Благодарим за прохождение интервью!</p>
                    <Link to='/menu'><button>На главную</button></Link>
                </Modal>
            </div>
        )
    }
}