import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import Root from 'main/Root.jsx';
import { getResourceUrl } from 'utilities/layoutHelper';
import store from 'store';

import reportWebVitals from './reportWebVitals';

/// ---- CONFIGURE AXIOS ---- ///
axios.defaults.baseURL = getResourceUrl();
axios.defaults.headers = {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    Expires: -1,
};
axios.defaults.withCredentials = true;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <Root />
            </HelmetProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
