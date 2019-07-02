import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// import the Redux app store.
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { rootReducer } from './store';

// import the router.
import { BrowserRouter as Router } from "react-router-dom";

// import theming
import { ThemeProvider } from "react-jss";
import theme from './theme';

// import utils libs
import { getResourceUrl, getEnvironment } from './utils/layoutHelper';

// import application entry point component
import Main from './layout/Main';

const env = getEnvironment();
const options = {
    enableReduxConsoleLog: false,
    isProduction: (env === 'PRODUCTION')
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = (options.isProduction)
    ? createStore(rootReducer, applyMiddleware(thunk))
    : (options.enableReduxConsoleLog) 
        ? createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))
        : createStore(rootReducer, applyMiddleware(thunk));

const root = (
    <ReduxProvider store={store}>
        <Router>
            <ThemeProvider theme={theme}>
                <Main />
            </ThemeProvider>
        </Router>
    </ReduxProvider>
);

bootApp();
serviceWorker.unregister();

function bootApp() {
    /// ---- CONFIGURE AXIOS ---- ///
    axios.defaults.baseURL = getResourceUrl();
    axios.defaults.withCredentials = true;

    ReactDOM.render(root, document.getElementById('root'));
}