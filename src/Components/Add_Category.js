import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { create_category } from '../api';

export function Add_Category() {
    const [is_active, set_is_active] = useState(false);
    const category_ref = useRef(null);

    const [category, set_category] = useState({
        name: "",
        type: "Inflow",
        current_amount: 0,
        total_amount: 0
    });

    useEffect(() => {
        // get_categories();
        // get_accounts();
    }, []);

    function clicked_add_category() {
        set_is_active(true);
    }

    function handle_change(e) {
        set_category({...category, [e.target.name]: e.target.value});
    }

    function handle_submit(e) {
        create_category(category);
        set_is_active(false);
    }

    function handle_cancel() {
        set_is_active(false);
    }

    return (
        <Wrapper >
            <Add_Category_Btn onClick={clicked_add_category}>Add Category</Add_Category_Btn>
            {is_active &&
                <New_Category ref={category_ref}>
                    <Row>
                        <Field_name>Name</Field_name>
                        <Name name="name" placeholder="category name" value={category.name} onChange={handle_change}/>    
                    </Row>
                    <Row>
                        <Field_name>Total Amount</Field_name>
                        <Amount name="total_amount" placeholder="total amount" value={category.total_amount} onChange={handle_change}/>
                    </Row>
                    <Row>
                        <Field_name>Type</Field_name>
                        <Type name="type" onChange={handle_change}>
                            <option value="Inflow">Inflow</option>
                            <option value="Outflow">Outflow</option>
                        </Type>
                    </Row>
                   
                    <Create_Btn onClick={handle_submit}>create</Create_Btn>
                    <Cancel_Btn onClick={handle_cancel}>cancel</Cancel_Btn>
                </New_Category>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Add_Category_Btn = styled.div`
    background: #3271a8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    margin: 8px;
    width: 200px;
`

const New_Category = styled.div`
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


const Type = styled(styled_select)``
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