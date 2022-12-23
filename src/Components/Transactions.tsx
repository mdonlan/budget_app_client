import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Transactions_Table } from './Transactions_Table';
import history from '../history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export function Transactions() {
    const transactions = useSelector((state: RootState) => state.default.transactions);
    // const [is_deleting, set_is_deleting] = useState(false);

    return (
        <Wrapper>
            <Top>
                <Title>Transactions</Title>
                {/* <div }><faCirclePlus /></div> */}
                <Button icon={faCirclePlus} onClick={() => {history.push("/add_transaction")}} />
            </Top>
            <Transactions_Table transactions={transactions}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    // height: 100%;
    overflow-y: auto;
    margin: 20px;
`

const Top = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    font-size: 32px;
    margin-top: 12px;
    margin-bottom: 12px;
`

const Button = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-left: 10px;
    transition: 0.3s;
    color: gray;

    :hover {
        color: #dddddd;
    }
`