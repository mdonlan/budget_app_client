import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router';
import { validate_token } from '../api';
import { store } from '../store';

export function Protected_Route(component, ...rest) {
    // const logged_in = useSelector(state => state.default.logged_in);
    // const [token_is_valid, set_token_is_valid] = useState(null);
    // const [first_render, set_first_render] = useState(true);

    // let token_is_valid = false;

    const [logged_in, set_logged_in] = useState(null);

    useEffect(async() => {
        // // console.log('protected route')
        // // let mounted = true;
        // // const token = localStorage.getItem("token");
        const result = await validate_token();
        if (result) {
            set_logged_in(result);
        }
        // const result = await validate_token(token);
        // console.log("result: " + result)
        // if (mounted) {
        //     console.log('blah')
        //     set_first_render(false);
        //     set_token_is_valid(result);
        // }
        // // const get_data = async () => {
        // //     let result;
        // //     if (mounted) {
        // //         result = await validate_token(token);
        // //         console.log('result: ' + result)
        // //     }
            
        // //     if (mounted) {
        // //         set_token_is_valid(result);
        // //     }
        // //     return () => { mounted = false; }
        // // }
        // // await get_data();
        // // console.log(`protected route \ntarget=${component.path} \nlogged_in: ${token_is_valid}`)

        // return () => {
        //     console.log('cleanup')
        //     mounted = false;
        // }
    }, [])



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
        // <Redirect to="/login" />
        // <Route {...rest} render={props => {logged_in ? <Component {...props} /> : <Redirect to='/login' /> }} />
        // <React.Fragment>
        //     {first_render &&
        //         <div>first render</div>
        //     }
        //     {!first_render &&
        //         <React.Fragment>
        //             {token_is_valid == null &&
        //                 <React.Fragment>
        //                     {token_is_valid &&
        //                         <Route component={component.component}/>
        //                     }
        //                     {!token_is_valid &&
        //                         <Redirect to='/login' />
        //                     }
        //                 </React.Fragment>
        //             } 
        //         </React.Fragment>
        //     }
        // </React.Fragment>
    )
}