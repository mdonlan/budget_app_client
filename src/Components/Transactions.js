import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { get_transactions, delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';

export function Transactions() {
    const transactions = useSelector(state => state.default.transactions);
    const [is_deleting, set_is_deleting] = useState(false);

    useEffect(() => {
        // console.log('hello')
        get_transactions();
        console.log('# transactions: ' + transactions.length)
    }, [])

    return (
        <Wrapper>
            <Buttons>
                <Add_Transaction />
                <Is_Deleting_Btn onClick={() => {set_is_deleting(!is_deleting)}}>{is_deleting ? "Stop Editing" : "Edit"}</Is_Deleting_Btn>
            </Buttons>
            {/* top row to show names of columns */}
            <Transaction column_names={true}>
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
                        {is_deleting &&
                                <Delete_Btn onClick={() => {delete_transaction(t)}}>Del</Delete_Btn>
                            }
                    </Transaction>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Buttons = styled.div`
    display: flex;
`

const Is_Deleting_Btn = styled.div`
    background: #3271a8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    margin: 8px;
    width: 200px;
`

const Delete_Btn = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 8px;
    margin-right: 8px;
    color: red;
    cursor: pointer;
`

const Transaction = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: ${props => props.column_names ? "#555555" : "#dddddd"};
`

const Transaction_Item = styled.div`
    width: 20%;
`