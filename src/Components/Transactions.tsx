import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';
import { RootState } from '../store';
import { format, startOfDay } from 'date-fns';
import { Transaction_Component } from './Transaction';

export function Transactions() {
    const transactions = useSelector((state: RootState) => state.default.transactions);
    const [is_deleting, set_is_deleting] = useState(false);

    return (
        <Wrapper>
            <Buttons>
                <Add_Transaction />
                {/* <Is_Deleting_Btn onClick={() => {set_is_deleting(!is_deleting)}}>{is_deleting ? "Stop Editing" : "Edit"}</Is_Deleting_Btn> */}
            </Buttons>
            {/* top row to show names of columns */}
            <Col_Headers>
                <Transaction_Col_Header>Name</Transaction_Col_Header>
                <Transaction_Col_Header>Date</Transaction_Col_Header>
                <Transaction_Col_Header>Value</Transaction_Col_Header>
                <Transaction_Col_Header>Tags</Transaction_Col_Header>
            </Col_Headers>


            {transactions.slice(0).reverse().map((t, i) => {
                return <Transaction_Component t={t} key={i}/>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Buttons = styled.div`
    display: flex;
`

// const Is_Deleting_Btn = styled.div`
//     background: #3271a8;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 8px;
//     cursor: pointer;
//     margin: 8px;
//     width: 200px;
// `

const Delete_Btn = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 8px;
    margin-right: 8px;
    color: red;
    cursor: pointer;
    background: #333333;
    position: absolute;
    left: calc(100% - 100px);
    top: 0px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Transaction_Wrapper = styled.div`
    display: flex;
    // margin-top: 8px;
    // margin-bottom: 8px;
    // margin-left: 8px;
    // padding: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
`

const Col_Headers = styled.div`
    display: flex;
    // margin-top: 8px;
    // margin-bottom: 8px;
    // margin-left: 8px;
    // padding: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    position: relative;
`



const Transaction_Item = styled.div`
    width: 20%;
`

const Transaction_Col_Header = styled.div`
    font-size: 18px;
    width: 20%;
    font-variant: small-caps;
    // color: white;
`

const Tag = styled.div`
    // margin-right: 15px;
    display: flex;
`
