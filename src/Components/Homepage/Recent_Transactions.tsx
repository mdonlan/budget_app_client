import React from 'react';
import { get_transaction_numbers_data } from '../../api';
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { Transactions_Table } from '../Transactions_Table';

export function Recent_Transactions() {
    const transactions = useSelector((state: RootState) => state.default.transactions);
    

    return (
        <Recent_Transactions_Wrapper>
            <Top>
                <Title>Recent Transactions</Title>
            </Top>
            <Bot>
                <Transactions_Table transactions={transactions.slice(transactions.length - 6)}/>
                <div>view more</div>
            </Bot>
        </Recent_Transactions_Wrapper>
    )
}

const Recent_Transactions_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justift-contenct: center;
    margin-top: 70px;
    width: 75%;
`

const Title = styled.div`
    color: #dddddd;
    // margin-top: 12px;
    // margin-bottom: 12px;
    font-size: 24px;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    color: #b5b5b5;
`

const Bot = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`