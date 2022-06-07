import React from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';
import { Num_Transactions } from './Num_Transactions';
import { Popular_Tags } from './Popular_Tags';
import { Recent_Transactions } from './Recent_Transactions';
import { Spending_By_Tag } from './Spending_By_Tag';
import { Daily_Spending_Chart } from './Daily_Spending_Chart';
import { Weekly_Spending_Chart } from './Weekly_Spending_Chart';

export function Homepage() {
    return (
        <Homepage_Wrapper>
            <Homepage_Item col_start={1} col_end={3}>
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
            <Homepage_Item>
                <Spending_By_Tag />
            </Homepage_Item>
            <Homepage_Item col_start={1} col_end={3}>
                <Daily_Spending_Chart />
            </Homepage_Item>
            <Homepage_Item col_start={1} col_end={3}>
                <Weekly_Spending_Chart />
            </Homepage_Item>
        </Homepage_Wrapper>
    )
}

const Homepage_Wrapper = styled.div`
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    // grid-template-columns: auto auto auto;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr; 
    // grid-column-start: 2;
    // grid-column-end: 4;
`

const Homepage_Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 50px;
    background: rgba(255, 255, 255, 0.09);
    // width: 375px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 3px;
    margin: 25px;
    grid-column-start: ${props => props.col_start};
    grid-column-end: ${props => props.col_end};
`