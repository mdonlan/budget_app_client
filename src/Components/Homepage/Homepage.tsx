import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';
import { Recent_Transactions } from './Recent_Transactions';
import { Recent_Tags } from './Recent_Tags';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Login } from '../Login'
import { Register } from '../Register';
import { Time_Period_Data } from './Time_Period_Data';
import { Time_Period } from '../../Types';
import { get_transactions, get_tags, validate_token } from '../../api';

export function Homepage() {
    const logged_in = useSelector((state: RootState) => state.default.logged_in);

    // if not logged in show either the Login or Register component
    useEffect(() => {
        (async () => {
            await validate_token();
            await get_transactions();
            await get_tags();
        })()
    }, [logged_in])
    
    const [show_login, set_show_login] = useState<boolean>(true);
    

    return (
        <Homepage_Wrapper>
            <Logo src='/logo.png'></Logo>
            {logged_in &&
                <>
                    
                    <Expenses/>
                    <Recent_Transactions />
                
                    <Time_Period_Data/>
                    
                </>
            }
            {!logged_in &&
                <Login_Or_Register>
                    {show_login &&
                        <Login />
                    }
                    {!show_login &&
                        <Register />
                    }
                    <Bottom>
                        <Button active={show_login} onClick={() => set_show_login(true)}>Login</Button>
                        <Button active={!show_login} onClick={() => set_show_login(false)}>Register</Button>
                    </Bottom>

                </Login_Or_Register>
            }
        </Homepage_Wrapper>
    );
}

const Homepage_Wrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Logo = styled.img`
    width: 25%;
    margin-top: 24px;
    margin-bottom: 50px;
`

const Login_Or_Register = styled.div`
    height: 300px;
    width: 300px;
    background: #222222;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Bottom = styled.div`
    display: flex;
    width: 100%;
    cursor: pointer;
`

const Button = styled.div<{active: boolean}>`
    background: ${props => props.active ? "#2d65c4" : "#333333"};
    width: 50%;
    padding: 8px;
    color: ${props => props.active ? "#dddddd" : "#6b6b6b"};
    display: flex;
    justify-content: center;
    align-items: center;
`