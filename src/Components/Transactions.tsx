import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';
import { RootState } from '../store';
import { format } from 'date-fns';


export function Transactions() {
    const transactions = useSelector((state: RootState) => state.default.transactions);
    const [is_deleting, set_is_deleting] = useState(false);

    return (
        <Wrapper>
            <Buttons>
                <Add_Transaction />
                <Is_Deleting_Btn onClick={() => {set_is_deleting(!is_deleting)}}>{is_deleting ? "Stop Editing" : "Edit"}</Is_Deleting_Btn>
            </Buttons>
            {/* top row to show names of columns */}
            <Transaction_Wrapper>
                <Transaction_Item>Name</Transaction_Item>
                <Transaction_Item>Date</Transaction_Item>
                <Transaction_Item>Value</Transaction_Item>
                <Transaction_Item>Tags</Transaction_Item>
            </Transaction_Wrapper>


            {transactions.map((t) => {
                return (
                    <Transaction_Wrapper key={t.id}>
                        <Transaction_Item>{t.name}</Transaction_Item>
                        <Transaction_Item>{format(new Date(t.date), 'MM/dd/yyyy')}</Transaction_Item>
                        <Transaction_Item>{t.value}</Transaction_Item>
                        {/* <Transaction_Item>{t.tags}</Transaction_Item> */}
                        {t.tags.map((tag, i) => {
                            return (
                                <Tag key={i}>{tag}</Tag>
                            )
                        })}
                        {is_deleting &&
                                <Delete_Btn onClick={() => {delete_transaction(t)}}>Del</Delete_Btn>
                            }
                    </Transaction_Wrapper>
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

const Transaction_Wrapper = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const Transaction_Item = styled.div`
    width: 20%;
`

const Tag = styled.div`
    margin-right: 15px;
`