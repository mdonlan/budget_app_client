import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { create_category } from '../api';

export function Add_Category() {
    // const [name, set_name] = useState("");
    const [is_active, set_is_active] = useState(false);
    const token = useSelector(state => state.default.token);

    const [category, set_category] = useState({
        name: "",
        type: "Inflow",
        current_amount: 0,
        total_amount: 0
    });

    function handle_change(e) {
        set_category({...category, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div onClick={() => {set_is_active(true)}}>add category</div>
            {is_active &&
                <div>
                    <Name name="name" placeholder="category name" value={category.name} onChange={handle_change}/>
                    <Total_Amount name="total_amount" placeholder="total_amount" value={category.total_amount} onChange={handle_change}/>
                    <select name="type" onChange={handle_change}>
                        <option>Inflow</option>
                        <option>Outflow</option>
                    </select>
                    <div onClick={() => {create_category(category, token)}}>submit</div>
                    <div onClick={() => {set_is_active(false)}}>cancel</div>
                </div>
            }
        </div>
    )
}

const Wrapper = styled.div``

const Name = styled.input``
const Total_Amount = styled.input``