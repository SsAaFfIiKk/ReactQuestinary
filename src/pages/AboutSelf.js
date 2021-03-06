import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import Modal from "../Modal"
import Instructions from '../Instructions'
import "../css/AboutSelf.css"


export default class AboutSelf extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            surname: "",
            middlename: "",
            isu_id: "",
            gender: "",
            age: "",
            vk: "",
            inst: "",
            facebook: "",
            elib: "",
            scopus: "",
            orcid: "",
            error: false,
            activei: false,
            activee: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.insModal = this.insModal.bind(this)
        this.endModal = this.endModal.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    };

    async componentDidMount() {
        const get_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_user_info"
        const res = await fetch(get_link, {
            method: "POST",
            body: JSON.stringify({
                "id": localStorage.getItem("id"),
            })
        })

        const data = await res.json()

        this.setState({
            name: data["name"],
            surname: data["surname"],
            middlename: data["middlename"],
            isu_id: data["isu_id"],
            gender: data["sex"],
            age: data["age"],
            vk: data["vk_url"],
            inst: data["instagram_url"],
            facebook: data["facebook_url"],
            elib: data["elibrary_id"],
            scopus: data["scpous_id"],
            orcid: data["orcid_id"]
        })
    }

    async getGender() {
        const gender_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_gender"
        await fetch(gender_link, {
            method: "POSt",
            body: JSON.stringify({
                "id": localStorage.getItem('id')
            })
        })
            .then(res => res.json())
            .then(out => this.setState({ gender: out }))
    }

    async sendData(e) {
        e.preventDefault();
        this.setState({ sended: false })

        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/update_profile"
        const data = {
            "isu_id": localStorage.getItem("id"),
            "sex": this.state.gender,
            "age": this.state.age,
            "vk_url": this.state.vk,
            "instagram_url": this.state.inst,
            "facebook_url": this.state.facebook,
            "elibrary_id": this.state.elib,
            "scpous_id": this.state.scopus,
            "orcid_id": this.state.orcid
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        await fetch(save_link, body)
            .then(res => res.json())
            .then(out => {
                if (out.response === "ok") {
                    this.endModal()
                }
                else {
                    this.setState({ error: true })
                }
            })
    };

    insModal() {
        let ins = this.state.activei
        this.setState({activei: !ins})
    }

    endModal() {
        let end = this.state.activee
        this.setState({activee: !end})
    }

    render() {
        const {error} = this.state
        return (
            <div>
                <div className="profile">
                    <div>
                        ????????????????????????: {this.state.surname} {this.state.name} {this.state.middlename}
                    </div>
                    <div>
                        ?????????????????? ??????????: {this.state.isu_id}
                    </div>
                </div>
                <div className="float">
                    <button className="insbutton" onClick={this.insModal}>????????????????????</button>
                </div>
                <Modal active={this.state.activei} setActive={this.insModal}>
                    {Instructions.ankIns()}
                </Modal>
                <div>
                    <form className="userform">
                        <h2>?????? ?????????????? ?? ???????????????????????? ??????????????????, ????????????????????, ?????????????????? ????????:</h2>
                        <div className="group">
                            <div className='genderradiobuttons'>
                                ??????:
                                <div className='radiobutton'>
                                    <label htmlFor="male">??????????????</label>
                                    <input type="radio" name="gender" value="m" id="male" checked={this.state.gender === 'm' ? true : false} onChange={this.handleChange}></input>
                                </div>
                                <div className='radiobutton'>
                                    <label htmlFor="female">??????????????</label>
                                    <input type="radio" name="gender" value="f" id="female" checked={this.state.gender === 'f' ? true : false} onChange={this.handleChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="age">??????????????</label>
                            <input className="slefinput" id="age" type="text" name="age" maxLength="3" defaultValue={this.state.age} onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="vk">???????????? ???? ?????????????? ??????????????????</label>
                            <input className="slefinput" id="vk" type="text" name="vk" defaultValue={this.state.vk} onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="inst">???????????? ???? ?????????????? ?? Instagram</label>
                            <input className="slefinput" id="inst" type="text" name="inst" defaultValue={this.state.inst} onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="facebook" >???????????? ???? ?????????????? ?? FaceBook</label>
                            <input className="slefinput" id="facebook" type="text" name="facebook" defaultValue={this.state.facebook} onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="elib">Elibrary id</label>
                            <input className="slefinput" id="elib" type="text" name="elib" defaultValue={this.state.elib} onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="scopus" >Scopus id</label>
                            <input className="slefinput" id="scopus" type="text" name="scopus" defaultValue={this.state.scopus} onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="orcid">Orcid id</label>
                            <input className="slefinput" id="orcid" type="text" name="orcid" defaultValue={this.state.orcid} onChange={this.handleChange}></input>
                        </div>
                        <header className={this.state.error ? 'warning warning-active' : 'warning'}>
                            {error && <Message
                                error={error}
                                content="???? ?????????????? ??????????????????, ???????????????????? ??????????" />}
                        </header>
                        <div className="group">
                            <center><button className="loginb" onClick={this.sendData}> ?????????????????? ????????????????????</button></center>
                        </div>
                    </form>
                    <Modal active={this.state.activee} setActive={this.endModal}>
                        {this.state.gender === "f" ? "??????????????????" : "??????????????????"} {localStorage.getItem("surname")} {localStorage.getItem("name")}, ???????????????????? ?????? ???? ?????????????????????? ????????????!
                        ?? ?????????????????? ?????????? ?????? ?????? ???????????? ???????????????? ????????????-????????????????, ?? ?????? ???? ?????????????????? ?????? ???? ?????????????????????? ??????????.
                        ???????? ?? ???????????????? ?????????????????????? ???????????? ?? ?????? ???????????????? ?????????????? ?????? ?????????????????? ??????????????????????, ???????????? ???????????????? ???????????? ???? ?????????? <a href="mailto:tolstoy.i.m@yandex.ru">tolstoy.i.m@yandex.ru</a>
                    </Modal>
                </div>
            </div>
        )
    }
}