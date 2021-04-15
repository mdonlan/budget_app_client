import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export function Top_Nav() {
    return (
        <div>
            <Styled_Link to="/">Budget</Styled_Link>
            <Styled_Link to="/register">register</Styled_Link>
            <Styled_Link to="/login">login</Styled_Link>
            <Styled_Link to="/transactions">transactions</Styled_Link>
        </div>
    )
}

const Styled_Link = styled(Link)`
    margin-left: 3px;
    margin-right: 3px;
`
