import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import superagent from 'superagent'

export function Add_Transaction() {

    const [is_active, set_is_active] = useState(false);
    const transaction_ref = useRef(null);

    const [transaction, set_transaction] = useState({
        name: "",
        created_date: new Date,
        amount: "",
        type: "",
        note: "",
        // is_complete: false,
        // completed_date: ""
    })

    function clicked_add_transaction() {
        console.log('clicked add transaction');
        set_is_active(true);
    }

    function create_transaction() {
        console.log(transaction_ref)
        superagent.post('http://localhost:3000/create_transaction')
        .send(transaction)
        .then(() => {
            console.log('completed post')
        })
    }

    function handle_change(e) {
        set_transaction({...transaction, [e.target.name]: e.target.value});
    }

    return (
        <Wrapper >
            <div onClick={clicked_add_transaction}>Add Transaction</div>
            {is_active &&
                <New_Transaction ref={transaction_ref}>
                    <Name name="name" placeholder="transaction name" value={transaction.name} onChange={handle_change}/>
                    <Created_Date name="created_date" value={transaction.created_date} onChange={handle_change}/>
                    <Amount name="amount" placeholder="amount" value={transaction.amount} onChange={handle_change}/>
                    <Type>
                        <option>inflow</option>
                        <option>outflow</option>
                    </Type>
                    <Note name="note" placeholder="note" value={transaction.note} onChange={handle_change}/>
                    {/* <Is_Complete name="is_complete" value={transaction.is_complete} onChange={handle_change}/> */}
                    {/* <Completed_Date name="completed_date" value={transaction.completed_date} onChange={handle_change}/> */}
                    <div onClick={create_transaction}>create</div>
                    <div>cancel</div>
                </New_Transaction>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``
const New_Transaction = styled.div``

const styled_input = styled.input`
    /* width: 150px; */
`

const Name = styled(styled_input)``
const Created_Date = styled(styled_input)``
const Amount = styled(styled_input)``
const Type = styled.select``
const Note = styled(styled_input)``
const Is_Complete = styled(styled_input)``
const Completed_Date = styled(styled_input)``