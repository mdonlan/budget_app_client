import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../api'
import { RootState } from '../store';
import { Add_Transaction } from './Add_Transaction';

export function Top_Nav(props) {
    const logged_in = useSelector<RootState>(state => state.default.logged_in);

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
                    <Left>
                        <Styled_Link path={props.location.pathname} to="/transactions">Transactions</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/tags">Tags</Styled_Link>
                        {/* <Add_Transaction /> */}
                    </Left>
                    <Right>
                        <Logout_Btn onClick={() => {logout()}}>Log Out</Logout_Btn>
                    </Right>
                </React.Fragment>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: ${props => props.theme.background};
    height: 70px;
    display: flex;
    align-items: center;
    // width: 100%;
`

const Styled_Link = styled(Link)<{path: string}>`
    margin-left: 14px;
    margin-right: 14px;
    padding-left: 5px;
    padding-right: 5px;
    text-decoration: none;
    color: ${props => props.path == props.to ? "white" : "gray"};
    cursor: pointer;
    font-size: 18px;
    border-bottom: ${props => props.path == props.to ? "1px solid" : "none"};
    font-variant:  small-caps;
    // :hover {
    //     color: white;
    // }
`

const Logout_Btn = styled.div`
    margin-left: 14px;
    margin-right: 14px;
    padding-left: 5px;
    padding-right: 5px;
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
