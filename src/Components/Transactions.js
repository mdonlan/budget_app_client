import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { get_transactions, delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';

export function Transactions() {
    const transactions = useSelector(state => state.default.transactions);
    const [is_deleting, set_is_deleting] = useState(false);

    useEffect(() => {
        get_transactions();
    }, [])

    return (
        <Wrapper>
            <Add_Transaction />
            <Is_Deleting_Btn onClick={() => {set_is_deleting(!is_deleting)}}>{is_deleting ? "Stop Editing" : "Edit"}</Is_Deleting_Btn>
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

const Is_Deleting_Btn = styled.div``
const Delete_Btn = styled.div``

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