import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { App } from './Components/App'
import { store } from './store'
import { Router } from 'react-router-dom'
// import { Bro as Router, Switch, Route, Link, useHistory, useLocation, Redirect } from "react-router-dom";
import "./style.css";
import history from './history'
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";

render(
    <Provider store={store}>
        <Router history={history}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Router>
    </Provider>, 
    document.getElementById("root")
);