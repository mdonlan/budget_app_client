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

            <Transactions_List>
                {transactions.slice(0).reverse().map((t, i) => {
                    return <Transaction_Component t={t} key={i}/>
                })}
            </Transactions_List>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    // margin-top: 50px;
    // padding: 20px;
    width: 100%;
    // height: 100%;
`

const Col_Headers = styled.div`
    display: flex;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    position: relative;
    color: white;
`

const Transaction_Col_Header = styled.div`
    font-size: 18px;
    width: 20%;
    font-variant: small-caps;
`

const Transactions_List = styled.div`
    height: 100%;
    overflow-y: auto;
`