import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { login } from '../api'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

export function Login() {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const logged_in = useSelector(state => state.default.logged_in);
    const [login_error, set_login_error] = useState(null);

    let history = useHistory();

    async function handle_submit(event) {
        event.preventDefault();
        const result = await login({ username: username, password: password });
        console.log(result)
        if (result.success) {
            history.push('/');
        } else {
            set_login_error(result.message);
        }
    }

    return (
        <Wrapper>
            <Form onSubmit={handle_submit}>
                <Styled_Input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></Styled_Input>
                <Styled_Input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></Styled_Input>
                <Login_Btn type="submit" value="Login"/>
                {login_error &&
                    <div>{login_error}</div>
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
    height: 32px;
    font-size: 18px;
    text-align: center;
    outline: none;
    background: #181a1b;
    
    :focus {
        background: #272a2b;
    }
`

const Login_Btn = styled.input`
    outline: none;
    border: none;
    margin-top: 15px;
    padding: 8px;
    background: #348ceb;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;

    :hover {
        background: #344ceb;
    }
`