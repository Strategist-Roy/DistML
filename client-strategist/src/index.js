//Global Imports
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//App Imports
import App from './app/App';
import store from './store/index';

window.store = store;
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// store.subscribe(() => { console.log(store.getState()) });

const fs = window.require('fs');
store.subscribe(() => fs.writeFile('src/initialState.json', JSON.stringify(store.getState()), (error) => { if (error) throw error; }));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
