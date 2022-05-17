import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get_accounts } from '../api';
import { Add_Account } from './Add_Account';
import styled from 'styled-components'

export function Accounts() {
    const accounts = useSelector(state => state.default.accounts);

    useEffect(() => {
        get_accounts();
    }, [])

    return (
        <div>
            <Add_Account />

            {/* <div>Accounts</div> */}
            {/* top row to show names of columns */}
            <Account column_names={true}>
                <Account_Item>Name</Account_Item>
                <Account_Item>Amount</Account_Item>
                {/* <Account_Item>Type</Account_Item>
                <Account_Item>Category</Account_Item>
                <Account_Item>Account</Account_Item> */}
            </Account>

            {accounts.map(t => {
                return (
                    <Account key={t.id}>
                        <Account_Item>{t.name}</Account_Item>
                        <Account_Item>{t.amount}</Account_Item>
                    </Account>
                )
            })}
        </div>
    )
}

const Account = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: ${props => props.column_names ? "#555555" : "#dddddd"};
`

const Account_Item = styled.div`
    width: 20%;
`