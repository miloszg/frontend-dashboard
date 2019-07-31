import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from "react-intl";
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale='en'>
            <App />
        </IntlProvider>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
