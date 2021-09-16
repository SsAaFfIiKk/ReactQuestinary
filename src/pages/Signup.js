import React, { Component } from 'react'
import { Message } from 'semantic-ui-react';

export default class Registr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            surname: null,
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ error: false });

        // const link = `http://10.64.34.105:8050/registration?isu_id=${this.state.id}&name=${this.state.name}&surname=${this.state.surname}`;
        const link = `https://mycandidate.onti.actcognitive.org/questionnaires/backend//registration?isu_id=${this.state.id}&name=${this.state.name}&surname=${this.state.surname}`;
        fetch(link,
            { method: "POST" })
            .then(res => res.json())
            .then(out => {
                console.log(out);
            })
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    };

    render() {
        const { error } = this.state;
        return (
            <div>
                <div className="titile">
                    <div className="titleText">
                        <p>Регистраци</p>
                    </div>
                </div>
                <div className="signup">
                    <form onSubmit={this.onSubmit}>
                        <header>
                            {error && <Message
                                error={error}
                                content="Вы уже зарегистрированы" />}
                        </header>
                        <div>Имя</div>
                        <div>
                            <input required placeholder="введите ваше имя" name="name" onChange={this.handleChange}></input>
                        </div>
                        <div>Фамилия</div>
                        <div>
                            <input required placeholder="введите вашу Фамилию" name="surname" onChange={this.handleChange}></input>
                        </div>
                        <div>Номер ИСУ</div>
                        <div>
                            <input required placeholder="введите ваш табельный номер ИСУ" name="id" onChange={this.handleChange}></input>
                        </div>
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        )
    }
}
