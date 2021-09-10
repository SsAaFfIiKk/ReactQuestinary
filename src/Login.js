import React from 'react';
import { Grid, Form, Header, Message } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import { Redirect } from 'react-router-dom';
import isLoggedIn from './IsLoged';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            surname: null,
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ error: false });

        const link = 'http://10.64.34.105:8050/check_user';
        const { history } = this.props;
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
                    store.set('loggedIn', true);
                    history.push('/menu');
                }
                else {
                    this.setState({ error: true });
                }
            })

    };

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
    };

    render() {
        if (isLoggedIn()) {
            return <Redirect to="/menu"/>;
        }

        const { error } = this.state;
        return (
            <Grid>
                <Helmet>
                    <title>CMS | Login</title>
                </Helmet>

                <Grid.Column width={6} />
                <Grid.Column width={4}>
                    <Form error={error} onSubmit={this.onSubmit}>
                        <Header as="h1">Вход</Header>
                        {error && <Message
                            error={error}
                            content="Не верные данные для входа."
                        />}
                        <Form.Input
                            inline
                            label="Фамилия:"
                            name="surname"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            inline
                            label="Имя:"
                            name="name"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            inline
                            label="Табельный номер:"
                            name="id"
                            onChange={this.handleChange}
                        />
                        <Form.Button type="submit">Войти</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;