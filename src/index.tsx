import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { App } from './Components/App'
import { store } from './store'
import { Router } from 'react-router-dom'
import "./style.css";
import history from './history'

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>, 
    document.getElementById("root")
);