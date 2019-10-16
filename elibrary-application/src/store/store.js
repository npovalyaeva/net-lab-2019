import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
    const store = createStore(
      createRootReducer(history),
      preloadedState,
      composeEnhancers(
        applyMiddleware(
          routerMiddleware(history),
          thunkMiddleware
        ),
      ),
    )
    return store
}