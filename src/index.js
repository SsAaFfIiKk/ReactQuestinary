import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';


const renderApp = () => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp();

if (module.hot) {
    module.hot.accept('./App', renderApp);
}