import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {createStore, applyMiddleware} from 'redux';  
import rootReducer from './reducers/index';  
import thunk from 'redux-thunk';

import  App  from './components/App';

function configureStore() {  
    return createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
}

const store = configureStore();

render(
    <Provider store={store}>
        <App />,
    </Provider>,
    document.getElementById('root')
);