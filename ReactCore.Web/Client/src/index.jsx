import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// import the Redux app store.
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { rootReducer } from './store';

// import the router.
import { BrowserRouter as Router } from "react-router-dom";

// import theming and Semantic UI default styling
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "react-jss";
import theme from './theme';
import 'semantic-ui-css/semantic.min.css'

// import utils libs and redux actions
import { getResourceUrl, getEnvironment } from './utils/layoutHelper';
import { getCurrentUser } from './store/users';

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
    : createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = (
    <HelmetProvider>
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Main />
                </Router>
            </ThemeProvider>
        </ReduxProvider>
    </HelmetProvider>
);

const bootApp = async () => {
    /// ---- CONFIGURE AXIOS ---- ///
    axios.defaults.baseURL = getResourceUrl();
    axios.defaults.withCredentials = true;

    await Promise.all([
        store.dispatch(getCurrentUser())
    ])

    ReactDOM.render(root, document.getElementById('root'));
}


serviceWorker.unregister();
bootApp();