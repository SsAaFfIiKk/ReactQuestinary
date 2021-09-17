import React, { Component } from 'react'
import "../css/AboutSelf.css"

export default class AboutSelf extends Component {

    async sendData() {
        const save_link = "https://mycandidate.onti.actcognitive.org/questionnaires/backend/update_profile"
        const data = {

        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(save_link, body)
    };

    render() {
        return (
            <div>
                <div>
                    Для участия в исследовании заполните, пожалуйста, следующие поля:
                </div>
                <form>
                    {/* <div>
                        <p>Имя</p>
                        <input required type="text"></input>
                    </div>
                    <div>
                        <p>Фамилия</p>
                        <input required type="text"></input>
                    </div> */}
                    <div>
                        <p>Пол</p>
                        <label htmlFor="1">Мужкской</label>
                        <input type="radio" name="gender" value="male" id="1"></input>
                        <label htmlFor="2">Женский</label>
                        <input type="radio" name="gender" value="female" id="2"></input>
                    </div>
                    <div>
                        <p>Возраст</p>
                        <input type="text" maxlength="3"></input>
                    </div>
                    {/* <div>
                        <p>Табельный номер ИСУ</p>
                        <input required type="text" maxLength="6"></input>
                    </div> */}
                    <div>
                        <p>Ссылка на VK</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Ссылка на Instagram</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Ссылка на Facebook</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Elibray id</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Scopus id</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Orcid id</p>
                        <input type="text"></input>
                    </div>
                    <button type="submit"> Отправить</button>
                </form>
            </div>
        )
    }
}