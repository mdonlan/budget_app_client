import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get_transactions } from '../api';
import { Add_Transaction } from './Add_Transaction';

export function Transactions() {

    const transactions = useSelector(state => state.default.transactions);

    useEffect(() => {
        get_transactions();
    }, [])

    return (
        <div>
            <Add_Transaction />

            <div>transactions</div>

            {transactions.map(t => {
                return (
                    <div key={t.id}>{t.name}</div>
                )
            })}
        </div>
    )
}