import React from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';

export function Homepage() {
    return (
        <Homepage_Wrapper>
            <Expenses />
        </Homepage_Wrapper>
    )
}

const Homepage_Wrapper = styled.div`
    display: flex;
`