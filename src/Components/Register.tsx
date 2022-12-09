import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { register_user } from '../api'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../store';

export function Register() {
    const [email, set_email] = useState('');
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const logged_in = useSelector((state: RootState) => state.default.logged_in);
    const [registration_error, set_registration_error] = useState(null);
    const history = useHistory();

    async function handle_submit(event) {
        event.preventDefault();
        const result = await register_user({ username: username, email: email, password: password });
        if (result.success) {
            history.push("/");
        } else {
            set_registration_error(result.message);
        }
    }

    // redirect the user off the register page if their account is created
    // useEffect(() => {
    //     if (logged_in) {
    //         history.push('/homepage');
    //     }
    // }, [logged_in]);

    return (
        <Wrapper>
            <Title>Register</Title>
            <Form onSubmit={handle_submit}>
                <Styled_Input onChange={e => {set_email(e.target.value)}} type="email" value={email} placeholder='email'></Styled_Input>
                <Styled_Input onChange={e => {set_username(e.target.value)}} value={username} placeholder='username'></Styled_Input>
                <Styled_Input onChange={e => {set_password(e.target.value)}} value={password} placeholder='password' type='password'></Styled_Input>
                {/* <div onClick={() => {handle_submit({ username: username, email: email, password: password })}}>register</div> */}
                <Register_Button type="submit" value="Register" />
                {registration_error &&
                    <div>{registration_error}</div>
                }
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    font-size: 32px;
    margin-top: 12px;
    margin-bottom: 24px;
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
    color: #dddddd;
`

const Register_Button = styled.input`
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