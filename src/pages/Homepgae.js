import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Homepgae extends Component {
    constructor() {
        super()

        this.state = {
            gender: ""
        }

        this.getGender()
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

    render() {
        return (
            <div className="info">
                <p>
                    {this.state.gender === "f" ? "Уважаемая" : "Уважаемый"} {localStorage.getItem("surname")} {localStorage.getItem("name")}!
                    <p>Cпасибо за Вашу готовность принять участие в исследовании.  Опрос будет включать четыре раздела: вопросы о ваших личностных особенностях, стиле командной работы, профессиональных интересах, анкета для указания общей информации. При ответе на вопросы руководствуйтесь следующими правилами:</p>
                    <p>1. Вопросы слишком коротки, чтобы в них содержались все необходимые подробности. Представляйте себе типичные ситуации, не задумываясь над деталями. Не тратьте времени на раздумья, наиболее естественный тот ответ, который первым приходит в голову.</p>
                    <p>2. Не пропускайте ничего, обязательно отвечайте подряд на каждый вопрос. Возможно, некоторые вопросы Вам будет трудно отнести к себе, в этом случае постарайтесь дать наилучший с Вашей точки зрения предположительный ответ.</p>
                    3. Помните, что "плохих" и "хороших" ответов быть не может. Не пытайтесь своими ответами произвести благоприятное впечатление. Свободно выражайте свое собственное мнение.</p>
                <Link to='menu/zaslonins'><button>Начать тест</button></Link>
            </div>
        )
    }
}
