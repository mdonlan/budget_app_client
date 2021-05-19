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

            {/* {transactions.map(t => {
                return (
                    <div key={t.id}>{t.name}</div>
                )
            })} */}
        </div>
    )
}