import React, { Component } from 'react'
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
            orcid: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
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

    async sendData() {
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
        console.log(data)
        console.log(JSON.stringify(data))

        const body = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        };

        console.log(body)

        const res = await fetch(save_link, body)
        const data1 = await res.json()
        console.log(data1)
    };

    render() {
        return (
            <div>
                <div>
                    Пользователь {this.state.surname} {this.state.name} {this.state.middlename}
                </div>
                <div>
                    Табельный номер {this.state.isu_id}
                </div>
                <div>
                    <form className="userform">
                        <h2>Для участия в исследовании заполните, пожалуйста, следующие поля:</h2>
                        <div className="groulabel">
                            <label>Пол</label>
                            <br />
                            <label htmlFor="">Мужской</label>
                            <input type="radio" name="gender" value="m" id="male" onChange={this.handleChange}></input>
                            <label htmlFor="">Женский</label>
                            <input type="radio" name="gender" value="f" id="female" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label>Возраст</label>
                            <input className="slefinput" id="age" type="text" name="age" maxLength="3" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label htmlFor="">Ссылка на VK</label>
                            <input className="slefinput" id="vk" type="text" name="vk" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label htmlFor="">Ссылка на Instagram</label>
                            <input className="slefinput" id="inst" type="text" name="inst" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label htmlFor="" >Ссылка на Facebook</label>
                            <input className="slefinput" id="facebook" type="text" name="facebook" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label htmlFor="">Elibray id</label>
                            <input className="slefinput" id="elib" type="text" name="elib" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label htmlFor="" >Scolabelus id</label>
                            <input className="slefinput" id="scopus" type="text" name="scopus" onChange={this.handleChange}></input>
                        </div>
                        <div className="groulabel">
                            <label htmlFor="">Orcid id</label>
                            <input className="slefinput" id="orcid" type="text" name="orcid" onChange={this.handleChange}></input>
                        </div>
                        <center><button onClick={this.sendData}> Отправить</button></center>
                    </form>
                </div>
            </div>
        )
    }
}