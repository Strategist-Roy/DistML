//Global Imports
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//App Imports
import App from './app/App';
import store from './store/index';

window.store = store;

store.subscribe(() => { console.log(store.getState()) });
store.subscribe(() => { localStorage["redux-store"] = JSON.stringify(store.getState()) });

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
