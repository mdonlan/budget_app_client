import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';
import { Recent_Transactions } from './Recent_Transactions';
import { Recent_Tags } from './Recent_Tags';

export function Homepage() {
    return (
        <Homepage_Wrapper>
            <Expenses />
            <Recent_Transactions />
            {/* <Recent_Tags /> */}
        </Homepage_Wrapper>
    );
}

const Homepage_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Layout_Item = styled.div`
    background: ${props => props.theme.background};
`
const Active_Month = styled.div`
    margin-right: 20px;
    font-size: 24px;
    // font-variant: small-caps;
`

const Top = styled.div`
    display: flex;
    margin-left: 30px;
`

const Active_Month_Btn = styled.div`
    line-height; 24px;
    display: flex;
    align-items: center;
    margin-left: 3px;
    marign-right: 3px;
    cursor: pointer;
`