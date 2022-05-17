import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import superagent from 'superagent'
import { get_accounts, create_account } from '../api';

export function Add_Account() {
    const [is_active, set_is_active] = useState(false);
    const account_ref = useRef(null);
    // const categories = useSelector(state => state.default.categories)

    const [account, set_account] = useState({
        name: "",
        created_date: "",
        amount: "",
    });

    useEffect(() => {
        // get_categories();
    }, []);

    function clicked_add_account() {
        console.log('clicked add account');
        set_is_active(true);
    }

    function handle_change(e) {
        set_account({...account, [e.target.name]: e.target.value});
    }

    return (
        <Wrapper >
            <Add_Account_Btn onClick={clicked_add_account}>Add Account</Add_Account_Btn>
            {is_active &&
                <New_Account ref={account_ref}>
                    <Name name="name" placeholder="account name" value={account.name} onChange={handle_change}/>
                    {/* <Created_Date name="created_date" value={transaction.created_date} onChange={handle_change}/> */}
                    <Amount name="amount" placeholder="amount" value={account.amount} onChange={handle_change}/>
                    {/* <Type>
                        <option>inflow</option>
                        <option>outflow</option>
                    </Type>
                    <select name="categories" onChange={handle_change}>
                        {categories.map(cat => {
                            return <option value={cat.name}>{cat.name}</option>
                        })}
                    </select> */}
                    {/* <Note name="note" placeholder="note" value={transaction.note} onChange={handle_change}/> */}
                    {/* <Is_Complete name="is_complete" value={transaction.is_complete} onChange={handle_change}/> */}
                    {/* <Completed_Date name="completed_date" value={transaction.completed_date} onChange={handle_change}/> */}
                    <Create_Btn onClick={() => {create_account(account)}}>Create</Create_Btn>
                    <Cancel_Btn>Cancel</Cancel_Btn>
                </New_Account>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``
const New_Account = styled.div``

const styled_input = styled.input`
    /* width: 150px; */
`

const Name = styled(styled_input)`
    border: none;
`
const Created_Date = styled(styled_input)``
const Amount = styled(styled_input)`
    border: none;
`
const Type = styled.select``
const Note = styled(styled_input)``
const Is_Complete = styled(styled_input)``
const Completed_Date = styled(styled_input)``

const Add_Account_Btn = styled.div`
    background: #3271a8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    margin: 8px;
    width: 200px;
`

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