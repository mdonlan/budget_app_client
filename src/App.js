import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import superagent from 'superagent'
import styled from "styled-components"
import { set_balance } from './store'

import { Add_Transaction } from './Add_Transaction'

export function App() {

    const [transactions, set_transactions] = useState([]);
    const balance = useSelector(state => state.default.balance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(set_balance(150));
        (async () => {
            try {
                const response = await superagent.get('http://localhost:3000');
                set_transactions(response.body);    
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    return (
        <Wrapper>
            <div>
                <div>balance: {balance}</div>
            </div>
            <Add_Transaction />
            <div>Transactions</div>
            {transactions.map((t, i) => {
                return <div key={i}>{t.name}</div>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`

`
