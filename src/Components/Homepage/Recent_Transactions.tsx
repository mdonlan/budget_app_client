import React from 'react';
import { get_transaction_numbers_data } from '../../api';
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

export function Recent_Transactions() {
    const transactions = useSelector((state: RootState) => state.default.transactions);
    

    return (
        <Recent_Transactions_Wrapper>
            <Top>
                <Title>Recent Transactions</Title>
            </Top>
            <Bot>
               {transactions.slice(transactions.length - 5).reverse().map((transaction, i) => {
                   return (
                        <Transaction key={i}>
                            <Name>{transaction.name}</Name>
                            <Value>{transaction.value}</Value>
                        </Transaction>
                   )
               })}
            </Bot>
            
            
        </Recent_Transactions_Wrapper>
    )
}

const Recent_Transactions_Wrapper = styled.div`
    // display: flex;
    // flex-direction: column;
    // padding: 20px;
    // padding-bottom: 50px;
    // background: rgba(255, 255, 255, 0.09);
    // width: 400px;
    // margin-left: 10px;
    // margin-right: 10px;
    // border-radius: 3px;
`

const Title = styled.div`
    color: #dddddd;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 24px;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    color: #b5b5b5;
    margin-bottom: 20px;
`

const Bot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #dddddd;
`

const Name = styled.div`
    
`
const Value = styled.div`
`

const Transaction = styled.div`
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 3px;
`