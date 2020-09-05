import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

let middlewareList = [
    thunk,
];

let middleware = applyMiddleware(...middlewareList);

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
}

const store = createStore(
    rootReducer,
    middleware
);

export default store;