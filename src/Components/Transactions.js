import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { get_transactions } from '../api';
import { Add_Transaction } from './Add_Transaction';

export function Transactions() {

    const transactions = useSelector(state => state.default.transactions);

    useEffect(() => {
        get_transactions();
    }, [])

    return (
        <Wrapper>
            <Page_Title>Transactions</Page_Title>

            <Add_Transaction />

            {/* top row to show names of columns */}
            <Transaction>
                <Transaction_Item>Name</Transaction_Item>
                <Transaction_Item>Amount</Transaction_Item>
                <Transaction_Item>Type</Transaction_Item>
                <Transaction_Item>Category</Transaction_Item>
                <Transaction_Item>Account</Transaction_Item>
            </Transaction>


            {transactions.map(t => {
                return (
                    <Transaction key={t.id}>
                        <Transaction_Item>{t.name}</Transaction_Item>
                        <Transaction_Item>{t.amount}</Transaction_Item>
                        <Transaction_Item>{t.type}</Transaction_Item>
                        <Transaction_Item>{t.category}</Transaction_Item>
                        <Transaction_Item>{t.account}</Transaction_Item>
                    </Transaction>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Page_Title = styled.div`
    font-size: 24px;
    padding: 5px;
`

const Transaction = styled.div`
    display: flex;
`

const Transaction_Item = styled.div`
    width: 20%;
`