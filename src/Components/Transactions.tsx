import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Transactions_Table } from './Transactions_Table';

export function Transactions() {
    const transactions = useSelector((state: RootState) => state.default.transactions);
    const [is_deleting, set_is_deleting] = useState(false);

    return (
        <Wrapper>
            <Transactions_Table transactions={transactions}/>
        </Wrapper>
    )
}

const Wrapper = styled.div``