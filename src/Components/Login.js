import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { login } from '../api'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export function Login() {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [status, set_status] = useState(null);
    const logged_in = useSelector(state => state.default.logged_in);

    let history = useHistory();

    async function handle_submit(data) {
        const result = await login(data, history);
        console.log(result)
        // set_status(result);
    }

    // redirect the user off the login page if their account is logged in
    useEffect(() => {
        if (logged_in) {
            history.push('/homepage');
        }
    }, [logged_in]);

    return (
        <Wrapper>
            <Form>
                <Styled_Input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></Styled_Input>
                <Styled_Input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></Styled_Input>
                <div onClick={() => {handle_submit({ username: username, password: password })}}>login</div>

                {status &&
                    <div>{status}</div>
                }
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Styled_Input = styled.input`
    border: none;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 24px;
    font-size: 18px;
`