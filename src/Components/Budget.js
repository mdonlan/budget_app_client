import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { get_categories } from '../api'
import { Add_Category } from './Add_Category'
import { Register } from './Register'

export function Budget() {
    const categories = useSelector(state => state.default.categories);

    const [is_deleting, set_is_deleting] = useState(false);

    useEffect(() => {
        get_categories();
    }, [])

    function delete_category(category) {
        console.log(category)
    }

    return (
        <Wrapper>
            <Top>
                <Add_Category />
                <Edit_Btn onClick={() => {set_is_deleting(!is_deleting)}}>{is_deleting ? "Stop Editing" : "Edit"}</Edit_Btn>
            </Top>
            <Bottom>
                {/* fake category for col names */}
                <Category column_names={true}>
                    <Item_Name>Name</Item_Name>
                    <Item_Current>Current Amount</Item_Current>
                    <Item_Total>Total Amount</Item_Total>
                </Category>
                {categories.filter(c  => c.type == 'Outflow').map(cat => {
                    return (
                        <Category key={cat.id}>
                            <Item_Name>{cat.name}</Item_Name>
                            <Item_Current>Spent: {cat.current_amount}</Item_Current>
                            <Item_Total>Budgeted: {cat.total_amount}</Item_Total>
                        </Category>
                    )
                })}
            </Bottom>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const Top = styled.div`
    display: flex;
`

const Bottom = styled.div`

`

const Edit_Btn = styled.div`
    background: #3271a8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    margin: 8px;
`

const Header = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 18px;
`

const Category = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: ${props => props.column_names ? "#555555" : "#dddddd"};
    /* margin-right: 4px; */
`

const Item_Name = styled.div`
    width: 200px;
`

const Item_Current = styled.div`
    width: 200px;
`

const Item_Total = styled.div`
`