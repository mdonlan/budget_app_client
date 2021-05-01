import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { App } from './Components/App'
import { store } from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import "./style.css";

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById("root")
);