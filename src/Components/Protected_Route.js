import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router';
// import { validate_token } from '../api';
// import { store } from '../store';

export function Protected_Route(component, ...rest) {
    const logged_in = useSelector(state => state.default.logged_in);

    useEffect(() => {

    }, [logged_in]);

    return (
        <React.Fragment>
            {logged_in == null &&
                <div>protected route</div>
            }
            {logged_in == true &&
                <Route component={component.component}/>
            }
            {logged_in == false &&
                <Redirect to='/login' />
            }
        </React.Fragment>
    )
}