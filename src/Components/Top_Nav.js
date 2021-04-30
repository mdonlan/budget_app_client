import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

export function Top_Nav() {

    const history = useHistory();
    const [path, set_path] = useState(null);

    useEffect(() => {
        set_path(history.location.pathname);
        console.log(path)
    }, [path])

    return (
        <Wrapper>
            <Styled_Link path={path} to="/" >Budget</Styled_Link>
            <Styled_Link path={path} to="/register">register</Styled_Link>
            <Styled_Link path={path} to="/login">login</Styled_Link>
            <Styled_Link path={path} to="/transactions">transactions</Styled_Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: #444444;
    height: 50px;
    display: flex;
    align-items: center;
`

const Styled_Link = styled(Link)`
    margin-left: 8px;
    margin-right: 8px;
    text-decoration: none;
    color: ${props => props.path == props.to ? "white" : "palevioletred"};
    cursor: pointer;
`
