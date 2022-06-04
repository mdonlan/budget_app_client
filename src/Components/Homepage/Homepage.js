import React from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';
import { Num_Transactions } from './Num_Transactions';
import { Popular_Tags } from './Popular_Tags';

export function Homepage() {
    return (
        <Homepage_Wrapper>
            <Expenses />
            <Num_Transactions />
            <Popular_Tags />
        </Homepage_Wrapper>
    )
}

const Homepage_Wrapper = styled.div`
    display: flex;
`