import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { register_user } from '../api'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export function Register() {
    const [email, set_email] = useState('');
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    // const logged_in = useSelector(state => state.default.logged_in);
    const [registration_error, set_registration_error] = useState(null);
    const history = useHistory();

    async function handle_submit(event) {
        event.preventDefault();
        const result = await register_user({ username: username, email: email, password: password });
        // console.log(result)
        set_registration_error(result);
    }

     // redirect the user off the register page if their account is created
    //  useEffect(() => {
    //     if (logged_in) {
    //         history.push('/homepage');
    //     }
    // }, [logged_in, registration_error]);

    return (
        <Wrapper>
            <Form onSubmit={handle_submit}>
                <input onChange={e => {set_email(e.target.value)}} type="email" value={email} placeholder='email'></input>
                <input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></input>
                <input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></input>
                {/* <div onClick={() => {handle_submit({ username: username, email: email, password: password })}}>register</div> */}
                <Register_Button type="submit" value="Register" />
                {registration_error &&
                    <div>{registration_error}</div>
                }
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div``
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Register_Button = styled.input``