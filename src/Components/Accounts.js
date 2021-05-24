import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get_accounts } from '../api';
import { Add_Account } from './Add_Account';

export function Accounts() {
    const accounts = useSelector(state => state.default.accounts);

    useEffect(() => {
        get_accounts();
    }, [])

    return (
        <div>
            <Add_Account />

            <div>accounts</div>

            {accounts.map(t => {
                return (
                    <div key={t.id}>
                        <div>{t.name}</div>
                        <div>{t.amount}</div>
                    </div>
                )
            })}
        </div>
    )
}