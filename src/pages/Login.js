import React from 'react';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            surname: null,
            error: false,
            isLogged: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ error: false });

        const link = 'http://10.64.34.105:8050/check_user';
        const data = {
            "id": this.state.id,
            "name": this.state.name,
            "surname": this.state.surname
        };

        const body = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(link, body)
            .then(res => res.json())
            .then(out => {

                if (out.answer) {
                    localStorage.setItem("token", "T")
                    localStorage.setItem("id", this.state.id)
                    localStorage.setItem("name", this.state.name)
                    localStorage.setItem("surname", this.state.surname)
                    // fetch()
                    this.setState({ isLogged: true })
                }

                else {
                    this.setState({ error: true });
                }
            })
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    };

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />
        }

        const { error } = this.state;
        return (
            <div>
                <div className="titile">
                    <div className="titleText">
                        Cogninitive Neverbal
                        <p>Аунтефикация</p>
                    </div>
                </div>
                <div className="instruction">
                    <p>Инструкция: </p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet augue mattis eleifend elit eros fermentum. Tellus pellentesque nunc id nisl mauris vitae, quis tincidunt pharetra. Ultricies eget nibh nunc leo morbi lacus tempor urna purus. Amet, dui mauris, molestie nunc, sit ut. Vivamus semper id amet mauris. Nunc urna et consequat fames sit. Morbi urna, dapibus euismod nulla sem sem morbi dui. In sapien fames integer morbi eget. Leo nulla eros ac elementum gravida enim vestibulum porttitor faucibus.
                </div>
                <div className="autification">
                    <form error={error} onSubmit={this.onSubmit}>
                        <header></header>
                        {error && <Message
                            error={error}
                            content="Не верный данные для входа" />}
                        <div>Имя</div>
                        <div>
                            <input placeholder="введите ваше имя" name="name" onChange={this.handleChange}></input>
                        </div>
                        <div>Фамилия</div>
                        <div>
                            <input placeholder="введите вашу Фамилию" name="surname" onChange={this.handleChange}></input>
                        </div>
                        <div>Номер ИСУ</div>
                        <div>
                            <input placeholder="введите ваш табельный номер ИСУ" name="id" onChange={this.handleChange}></input>
                        </div>
                        <button type="submit">Вход в систему</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;