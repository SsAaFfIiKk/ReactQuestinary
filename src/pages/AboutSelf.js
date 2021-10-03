import React, { Component } from 'react'
import { Message } from 'semantic-ui-react';
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
            activei: false,
            sended: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        this.insertFilds()
    }

    insertFilds() {
        document.getElementById("male").checked = this.state.gender === 'm' ? true : false
        document.getElementById("female").checked = this.state.gender === 'f' ? true : false
        document.getElementById("age").value = this.state.age
        document.getElementById("vk").value = this.state.vk
        document.getElementById("inst").value = this.state.inst
        document.getElementById("facebook").value = this.state.facebook
        document.getElementById("elib").value = this.state.elib
        document.getElementById("scopus").value = this.state.scopus
        document.getElementById("orcid").value = this.state.orcid
    }

    sendData() {
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


        fetch(save_link, body)
        this.setState({ sended: true })
    };

    openModal() {
        this.setState({ activei: true })
    }


    closeModal() {
        this.setState({ activei: false })
    }

    render() {
        const { sended } = this.state
        return (
            <div>
                <div className="profile">
                    <div>
                        Пользователь: {this.state.surname} {this.state.name} {this.state.middlename}
                    </div>
                    <div>
                        Табельный номер: {this.state.isu_id}
                    </div>
                </div>
                <div className="float">
                    <button className="insbutton" onClick={this.openModal}>Инструкция</button>
                </div>
                <Modal active={this.state.activei} setActive={this.closeModal}>
                    {Instructions.ankIns()}
                </Modal>
                <div>
                    <form className="userform">
                        <header className={this.state.sended ? 'warning warning-active' : 'warning'}>
                            {sended && <Message
                                error={sended}
                                content="Данные сохраненны" />}
                        </header>
                        <h2>Для участия в исследовании заполните, пожалуйста, следующие поля:</h2>
                        <div className="group">
                            <div className='genderradiobuttons'>
                                Пол:
                                <div className='radiobutton'>
                                    <label htmlFor="male">Мужской</label>
                                    <input type="radio" name="gender" value="m" id="male" onChange={this.handleChange}></input>
                                </div>
                                <div className='radiobutton'>
                                    <label htmlFor="female">Женский</label>
                                    <input type="radio" name="gender" value="f" id="female" onChange={this.handleChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="age">Возраст</label>
                            <input className="slefinput" id="age" type="text" name="age" maxLength="3" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="vk">Ссылка на профиль ВКонтакте</label>
                            <input className="slefinput" id="vk" type="text" name="vk" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="inst">Ссылка на профиль в Instagram</label>
                            <input className="slefinput" id="inst" type="text" name="inst" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="facebook" >Ссылка на профиль в FaceBook</label>
                            <input className="slefinput" id="facebook" type="text" name="facebook" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="elib">Elibrary id</label>
                            <input className="slefinput" id="elib" type="text" name="elib" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="scopus" >Scopus id</label>
                            <input className="slefinput" id="scopus" type="text" name="scopus" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="orcid">Orcid id</label>
                            <input className="slefinput" id="orcid" type="text" name="orcid" onChange={this.handleChange}></input>
                        </div>
                    </form>
                    <div className="group">
                        <center><button className="loginb" onClick={this.sendData}> Отправить</button></center>
                    </div>
                </div>
            </div>
        )
    }
}