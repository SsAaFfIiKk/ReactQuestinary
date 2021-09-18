import React from 'react';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import "../css/Login.css"
// import Arrow from "../img/arrow.svg"
// import Ava from "../img/Ava.svg"

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

    onSubmit() {
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
        this.setState({ [event.target.name]: event.target.value })
    };

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/" />
        }

        const { error } = this.state;
        return (
            <div>
                <div className="instruction">
                    <span>«Исследование личностных и профессиональных характеристик сотрудников и обучающихся» </span>проводится для того, чтобы помочь студентам выбрать наиболее подходящие для них направления научно-исследовательской работы, а также сформировать из студентов коллективы на основании их индивидуальных особенностей и научных интересов.
                </div>
                <div>
                    <div className="loginform">
                        <form error={error}>
                            {/* <img className="ava" src={Ava} alt="Вход"></img> */}
                            <header>
                                {error && <Message
                                    error={error}
                                    content="Неверный данные для входа" />}
                            </header>
                            <div className="ftitle">Имя</div>
                            <div>
                                <input placeholder="Введите ваше имя" name="name" onChange={this.handleChange}></input>
                            </div>
                            <div className="ftitle"> Фамилия</div>
                            <div>
                                <input placeholder="Введите вашу фамилию" name="surname" onChange={this.handleChange}></input>
                            </div>
                            <div className="ftitle">Номер ИСУ</div>
                            <div>
                                <input placeholder="Введите ваш табельный номер ИСУ" name="id" onChange={this.handleChange}></input>
                            </div>
                        </form>
                    </div>
                    <div>
                        <button className="login" onClick={this.onSubmit}>Вход в систему {/*<img className="arrow" src={Arrow} alt=">"></img>*/} </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;