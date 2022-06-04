import React from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';
import { Num_Transactions } from './Num_Transactions';
import { Popular_Tags } from './Popular_Tags';
import { Recent_Transactions } from './Recent_Transactions';

export function Homepage() {
    return (
        <Homepage_Wrapper>
            <Homepage_Item>
                <Expenses />
            </Homepage_Item>
                <Homepage_Item>
            <Num_Transactions />
            </Homepage_Item>
                <Homepage_Item>
            <Popular_Tags />
                </Homepage_Item>
            <Homepage_Item>
                <Recent_Transactions />
            </Homepage_Item>
        </Homepage_Wrapper>
    )
}

const Homepage_Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Homepage_Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 50px;
    background: rgba(255, 255, 255, 0.09);
    width: 400px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 3px;
    margin: 25px;
`