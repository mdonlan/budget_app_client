import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import superagent from 'superagent'
import { get_categories, create_transaction, get_accounts } from '../api';
import { Transactions } from './Transactions';

export function Add_Transaction() {

    const [is_active, set_is_active] = useState(false);
    const transaction_ref = useRef(null);
    const categories = useSelector(state => state.default.categories);
    const accounts = useSelector(state => state.default.accounts);

    const [transaction, set_transaction] = useState({
        name: "",
        created_date: "",
        amount: 0,
        type: "",
        note: "",
        category: "",
        account: ""
        // is_complete: false,
        // completed_date: ""
    });

    useEffect(() => {
        get_categories();
        get_accounts();
    }, []);

    function clicked_add_transaction() {
        set_is_active(true);
    }

    function handle_change(e) {
        set_transaction({...transaction, [e.target.name]: e.target.value});
    }

    function handle_submit(e) {
        if (transaction.category == "") transaction.category = categories[0].name;
        if (transaction.account == "") transaction.account = accounts[0].name;
        if (transaction.type == "") transaction.type = "Inflow";
        create_transaction(transaction);
        set_is_active(false);
    }

    function handle_cancel() {
        set_is_active(false);
    }

    return (
        <Wrapper >
            <Add_Transaction_Btn onClick={clicked_add_transaction}>Add Transaction</Add_Transaction_Btn>
            {is_active &&
                <New_Transaction ref={transaction_ref}>
                    <Row>
                        <Field_name>Name</Field_name>
                        <Name name="name" placeholder="transaction name" value={transaction.name} onChange={handle_change}/>    
                    </Row>
                    <Row>
                        <Field_name>Amount</Field_name>
                        <Amount name="amount" placeholder="amount" value={transaction.amount} onChange={handle_change}/>
                    </Row>
                    <Row>
                        <Field_name>Category</Field_name>
                        <Category name="category" onChange={handle_change}>
                            {categories.map(cat => {
                                return <option key={cat.id} value={cat.name}>{cat.name}</option>
                            })}
                        </Category>
                    </Row>
                    <Row>
                        <Field_name>Account</Field_name>
                        <Account name="account" onChange={handle_change}>
                            {accounts.map(account => {
                                return <option key={account.id} value={account.name}>{account.name}</option>
                            })}
                        </Account>
                    </Row>
                    <Row>
                        <Field_name>Note</Field_name>
                        <Note name="note" placeholder="note" value={transaction.note} onChange={handle_change}/>
                    </Row>
                   
                    <Create_Btn onClick={handle_submit}>create</Create_Btn>
                    <Cancel_Btn onClick={handle_cancel}>cancel</Cancel_Btn>
                </New_Transaction>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Add_Transaction_Btn = styled.div`
    background: #3271a8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    margin: 8px;
    width: 200px;
`

const New_Transaction = styled.div`
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 400px;
    background: #23292b;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Row = styled.div`
    display: flex;
    margin-top: 8px;
    padding: 8px;
    width: 75%;
`

const Field_name = styled.div`
    margin-right: 8px;
    width: 50%;
    text-align: center;
`

const styled_input = styled.input`
    background: #384245;
    text-decoration: none;
    border: none;
    outline: none;
    color: #dddddd;
    width: 50%;
`

const styled_select = styled.select`
    width: 50%;
`

const Name = styled(styled_input)``
const Amount = styled(styled_input)``


const Category = styled(styled_select)``
const Account = styled(styled_select)``

const Note = styled(styled_input)``
const Is_Complete = styled(styled_input)``
const Completed_Date = styled(styled_input)``

const Create_Btn = styled.div`
    padding: 8px;
    margin: 8px;
    background: #186e2c;
    cursor: pointer;
`

const Cancel_Btn = styled.div`
    padding: 8px;
    margin: 8px;
    background: #702618;
    cursor: pointer;
`