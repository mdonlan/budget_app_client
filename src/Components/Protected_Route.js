import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { store } from '../store';

export function Protected_Route(component, ...rest) {
    const logged_in = useSelector(state => state.default.logged_in);

    return (
        // <Redirect to="/login" />
        // <Route {...rest} render={props => {logged_in ? <Component {...props} /> : <Redirect to='/login' /> }} />
        <React.Fragment>
            {logged_in &&
                <Route component={component.component}/>
            }
            {!logged_in &&
                <Redirect to='/login' />
            }
        </React.Fragment>
    )
}