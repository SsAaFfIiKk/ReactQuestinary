import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import store from 'store';
import { Redirect } from 'react-router-dom';
import isLoggedIn from './IsLoged';

import About from "./AboutSelf"

const handleLogout = history => () => {
    store.remove('loggedIn');
    history.push('/login');
};

const Main = ({ history }) => {
    if (!isLoggedIn()) {
        return <Redirect to="/login"/>;
    }

    return (
        <div>
            <Sidebar as={Menu} inverted visible vertical width="thin" icon="compas">
                <Menu.Item>
                    О себе
                </Menu.Item>
                <Menu.Item name="test">
                    <Icon name="users" />
                    Тесты
                </Menu.Item>
                <Menu.Item name="logout" onClick={handleLogout(history)}>
                    <Icon name="power" />
                    Выйти
                </Menu.Item>
            </Sidebar>
            <div className="mainBody">
                <About />
            </div>
        </div>
    );
};

export default Main;