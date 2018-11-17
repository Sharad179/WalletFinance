import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import BookList from './components/pages/mainpage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import { history } from './helpers/history';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

const Routes = (
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <BookList></BookList>
            </Switch>
        </BrowserRouter>
    </Provider>
);
render(
    Routes,
    document.getElementById('app')
);