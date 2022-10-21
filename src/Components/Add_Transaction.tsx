import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { create_transaction } from '../api';
// import { Transactions } from './Transactions';
import { RootState, Tag } from '../store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Matching_Tag_Props {
    active: boolean;
};

export function Add_Transaction() {

    const [is_active, set_is_active] = useState(false);
    const transaction_ref = useRef(null);
    const existing_tags = useSelector((state: RootState) => state.default.tags);

    const [transaction, set_transaction] = useState({
        name: "",
        tags: [],
        value: 0,
        date: new Date()
    });

    // const [startDate, setStartDate] = useState(new Date());

    // const [adding_new_tag, set_adding_new_tag] = useState(false);
    const [current_tag, set_current_tag] = useState("");
    const [matching_tags, set_matching_tags] = useState([]);
    const [active_matching_tag, set_active_matching_tag] = useState(null);
    const [matching_tags_index, set_matching_tags_index] = useState(0);

    useEffect(() => {
        // get_categories();
        // get_accounts();
    }, []);

    function clicked_add_transaction() {
        set_is_active(true);
    }

    function handle_change(e) {
        set_transaction({...transaction, [e.target.name]: e.target.value});
    }

    function handle_submit(e) {
        create_transaction(transaction);
        set_is_active(false);
        set_transaction({name: "", tags: [], value: 0, date: new Date()});
    }

    function handle_cancel() {
        set_is_active(false);
    }

    function new_tag_keydown(event) {
        if (event.keyCode == 13) { // enter
            add_new_tag();
        } else if (event.keyCode == 27) { // escape
           clear_new_tag()
        } else if (event.keyCode == 38) { // up arrow key
            let index = matching_tags_index - 1;
            if (index < 0) index = 0;
            set_matching_tags_index(index);
        } else if (event.keyCode == 40) { // down arrow key
            let index = matching_tags_index + 1;
            if (index > matching_tags.length - 1) index = matching_tags.length - 1;
            set_matching_tags_index(index);
        }
    }

    function add_new_tag() {
        let tag = null;
        const matching_tag = matching_tags[matching_tags_index];
        if (matching_tag) {
            tag = matching_tag;
        } else {
            tag = current_tag;
        }

        const tags = transaction.tags;
        tags.push(tag);
        set_transaction({...transaction, tags: tags});
        // set_adding_new_tag(false);
        clear_new_tag();
    }

    function clear_new_tag() {
        set_current_tag("");
        set_matching_tags([]);
        set_matching_tags_index(0);
    }

    function handle_new_tag_change(e) {
        const input_text = e.target.value;
        const matching = [];
        existing_tags.forEach(tag => {
            if (tag.value.includes(input_text)) {
                matching.push(tag.value);
            }
        })
        set_matching_tags(matching);
        set_current_tag(e.target.value)
    }

    function remove_tag(tag) {
        const new_tags = transaction.tags.filter(t => {
            return t !== tag;
        });

        set_transaction({...transaction, tags: new_tags});
    }

    return (
        <Wrapper >
            <Add_Transaction_Btn onClick={clicked_add_transaction}>Add Transaction</Add_Transaction_Btn>
            {is_active &&
                <New_Transaction ref={transaction_ref}>
                    <Row>
                        <Field_Name>Name</Field_Name>
                        <Name name="name" placeholder="transaction name" value={transaction.name} onChange={handle_change}/>    
                    </Row>
                    <Row>
                        <Field_Name>Date</Field_Name>
                        <DatePicker selected={transaction.date} onChange={(date:Date) => set_transaction({...transaction, ["date"]: date}) } />
                    </Row>
                    <Row>
                        <Field_Name>Amount</Field_Name>
                        <Amount name="value" placeholder="value" value={transaction.value} onChange={handle_change}/>
                    </Row>
                    {/* <Row> */}
                        <Field_Name>Tags</Field_Name>
                        <Tags>
                            {transaction.tags.map((tag, i) => {
                                return (
                                    <Tag key={i}>
                                        <Tag_Name>{tag}</Tag_Name>
                                        <Tag_Remove_Btn onClick={() => {remove_tag(tag)}} >x</Tag_Remove_Btn>
                                    </Tag>
                                )
                            })}
                        </Tags>
                        <div>
                            <input value={current_tag} onChange={handle_new_tag_change} onKeyDown={new_tag_keydown} />
                            {matching_tags.map((tag, i) => {
                                return <Matching_Tag active={i == matching_tags_index ? true : false} key={i} onClick={() => {add_new_tag()}}>{tag}</Matching_Tag>
                            })}
                        </div>
                    {/* </Row> */}
                   
                    <Create_Btn onClick={handle_submit}>create</Create_Btn>
                    <Cancel_Btn onClick={handle_cancel}>cancel</Cancel_Btn>
                </New_Transaction>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Add_Transaction_Btn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    margin: 8px;
    width: 200px;

    background: #00607A;

    :hover {
        background: #0098c2;
    }
`

const New_Transaction = styled.div`
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 300px;
    background: #23292b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
`

const Row = styled.div`
    display: flex;
    margin-top: 8px;
    padding: 8px;
    width: 75%;
`

const Field_Name = styled.div`
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

const Tags = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Tag = styled.div`
    background: #3b8fd9;
    border-radius: 3px;
    padding: 3px;
    margin: 3px;

    display: flex;

    :hover {
        background: #61a9e8;
    }
`

const Tag_Name = styled.div`
    margin-right: 5px;
`

const Tag_Remove_Btn = styled.div``

const Matching_Tag = styled.div<Matching_Tag_Props>`
    background: ${props => props.active ? "blue" : "red"};
`