import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { rootReducer } from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history)
        )
    )
);