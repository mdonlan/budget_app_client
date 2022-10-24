import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../api'
import { RootState } from '../store';
import { Add_Transaction } from './Add_Transaction';

export function Left_Nav(props) {
    const logged_in = useSelector<RootState>(state => state.default.logged_in);
    const history = useHistory();

    return (
        <Wrapper>
            <Styled_Link path={props.location.pathname} to="/" >Home</Styled_Link>
            {!logged_in &&
                <React.Fragment>
                    <Styled_Link path={props.location.pathname} to="/register">Register</Styled_Link>
                    <Styled_Link path={props.location.pathname} to="/login">Login</Styled_Link>
                </React.Fragment>
            }
            {logged_in &&
                <React.Fragment>
                    {/* <Left> */}
                        <Styled_Link path={props.location.pathname} to="/transactions">Transactions</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/tags">Tags</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/charts">Charts</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/add_transaction">New Transaction</Styled_Link>
                        {/* <Add_Transaction /> */}
                    {/* </Left> */}
                    {/* <Right> */}
                        <Logout_Btn onClick={() => {logout()}}>Log Out</Logout_Btn>
                    {/* </Right> */}
                </React.Fragment>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: ${props => props.theme.background};
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Styled_Link = styled(Link)<{path: string}>`
    padding-top: 10px;
    padding-bottom: 10px;
    text-decoration: none;
    color: ${props => props.path == props.to ? "white" : "gray"};
    background: ${props => props.path == props.to ? "#333333" : props.theme.background};
    cursor: pointer;
    font-size: 18px;
    font-variant:  small-caps;
    :hover {
        background: #333333;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Logout_Btn = styled.div`
    margin-top: 14px;
    margin-bottom: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: gray;
    cursor: pointer;
    font-size: 18px;
    font-variant:  small-caps;

    :hover {
        color: white;
    }
`

const Left = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
`

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 50%;
    padding-right: 15px;
`
