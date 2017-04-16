import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import commentApp from './redux/reducers';
import { loadState, saveState } from './db/localStorage';

const persistedState = loadState();

let store = createStore(commentApp, persistedState);

store.subscribe(() => {
    saveState({
        comments: store.getState().comments
    });
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
