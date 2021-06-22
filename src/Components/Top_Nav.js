import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../api'

export function Top_Nav(props) {

    const history = useHistory();
    const logged_in = useSelector(state => state.default.logged_in);
    // const [path, set_path] = useState(null);

    // useEffect(() => {
    //     console.log('render top_nav')
    //     // set_path(history.location.pathname);
    //     // console.log(path)
    //     console.log('location: ' + props.location.pathname)
    //     console.log('logged_in: ' + logged_in)
    // }, [])

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
                        <Styled_Link path={props.location.pathname} to="/budget" >Budget</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/transactions">Transactions</Styled_Link>
                        <Styled_Link path={props.location.pathname} to="/accounts">Accounts</Styled_Link>
                    </Left>
                    <Right>
                        <Logout_Btn onClick={() => {logout(history)}}>Log Out</Logout_Btn>
                    </Right>
                </React.Fragment>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: #1c1c1c;
    height: 70px;
    display: flex;
    align-items: center;
`

const Styled_Link = styled(Link)`
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
    :hover {
        color: white;
    }
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
`
const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 50%;
    padding-right: 15px;
`
