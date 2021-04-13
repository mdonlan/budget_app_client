import React, { useState } from 'react'
import styled from 'styled-components'
import { login } from '../api'
import { useHistory } from "react-router-dom";

export function Login() {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [status, set_status] = useState(null);

    let history = useHistory();

    async function handle_submit(data) {
        const result = await login(data, history);
        console.log(result)
        // set_status(result);
    }

    return (
        <Wrapper>
            <Form>
                <input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></input>
                <input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></input>
                <div onClick={() => {handle_submit({ username: username, password: password })}}>login</div>

                {status &&
                    <div>{status}</div>
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