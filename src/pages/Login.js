import React from 'react';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import "../css/Login.css"

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

        const link = 'https://mycandidate.onti.actcognitive.org/questionnaires/backend/check_user';
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
                    this.setState({ isLogged: true })
                }

                else {
                    this.setState({ error: true });
                
                }
            })
    };

    handleChange(event) {
        this.setState({ error: false });
        this.setState({ [event.target.name]: event.target.value })
    };

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />
        }

        const { error } = this.state;
        return (
            <div>
                <div>
                    <form className="loginform" error={error} onSubmit={this.onSubmit}>
                        <h1>Вход в систему</h1>
                        <header className={this.state.error ? 'warning warning-active': 'warning'}>
                            {error && <Message
                                error={error}
                                content="Неверные данные для входа" />}
                        </header>
                        <div className="group">
                            <label htmlFor="">Фамилия: </label>
                            <input className="loginput" placeholder="Введите вашу фамилию" name="surname" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="">Имя: </label>
                            <input className="loginput" placeholder="Введите ваше имя" name="name" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <label htmlFor="">Ваш ИСУ ID: </label>
                            <input className="loginput" placeholder="Введите ваш табельный номер ИСУ" name="id" onChange={this.handleChange}></input>
                        </div>
                        <div className="group">
                            <center><button className="loginb" type="submit">Вход</button></center>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default Login;