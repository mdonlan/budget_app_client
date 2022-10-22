import React from 'react';
import styled from 'styled-components';
import { Transaction_Component } from './Transaction';
import { Transaction } from '../store'

interface Props {
    transactions: Transaction[]
};

export const Transactions_Table: React.FC<Props> = ({transactions = []}: Props) => {
    return (
        <Wrapper>
            <Col_Headers>
                <Transaction_Col_Header>Name</Transaction_Col_Header>
                <Transaction_Col_Header>Date</Transaction_Col_Header>
                <Transaction_Col_Header>Value</Transaction_Col_Header>
                <Transaction_Col_Header>Tags</Transaction_Col_Header>
            </Col_Headers>

            {transactions.slice(0).reverse().map((t, i) => {
                return <Transaction_Component t={t} key={i}/>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 50px;
`

const Col_Headers = styled.div`
    display: flex;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    position: relative;
`

const Transaction_Col_Header = styled.div`
    font-size: 18px;
    width: 20%;
    font-variant: small-caps;
`