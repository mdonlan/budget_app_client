import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../api'
import { RootState } from '../store';
import { Add_Transaction } from './Add_Transaction';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Left_Nav(props) {
    const logged_in = useSelector<RootState>(state => state.default.logged_in);
    const history = useHistory();

    return (
        <Wrapper>
            {logged_in &&
                <React.Fragment>
                    <Top>
                        <Styled_Link path={props.location.pathname} to="/" >Home</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/transactions">Transactions</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/tags">Tags</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/add_transaction">New Transaction &nbsp;<FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon></Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/details">Details</Styled_Link>
                    </Top>
                    <Bot>
                        <Logout_Btn onClick={() => {logout()}}>Log Out</Logout_Btn>
                    </Bot>
                </React.Fragment>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: ${props => props.theme.left_nav_background};
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Top = styled.div`
    height: 70%;
    width: 100%;
`;

const Bot = styled.div`
    height: 30%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

export const Styled_Link = styled(Link)<{path: string}>`
    padding-top: 15px;
    padding-bottom: 15px;
    text-decoration: none;
    transition: 0.3s;
    color: ${props => props.path == props.to ? "white" : "gray"};
    background: ${props => props.path == props.to ? props.theme.background : props.theme.left_nav_background};
    cursor: pointer;
    font-size: 18px;
    font-variant:  small-caps;
    :hover {
        background: #333333;
        color: white;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Logout_Btn = styled.div`
    // margin-top: 14px;
    // margin-bottom: 14px;
    padding-top: 15px;
    padding-bottom: 15px;
    color: gray;
    cursor: pointer;
    font-size: 18px;
    font-variant:  small-caps;
    width: 100%;
    text-align: center;
    transition: 0.3s;

    :hover {
        background: #333333;
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
