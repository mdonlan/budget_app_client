import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { delete_category, get_categories } from '../api'
import { Add_Category } from './Add_Category'
import { Register } from './Register'

export function Budget() {
    const categories = useSelector(state => state.default.categories);

    const [is_deleting, set_is_deleting] = useState(false);

    useEffect(() => {
        // get_categories();
        // console.log('# categories: ' + categories.length)
    }, [])

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
                    <Item_Name>Type</Item_Name>
                    <Item_Current>Current Amount</Item_Current>
                    <Item_Total>Total Amount</Item_Total>
                </Category>
                {categories.map(cat => {
                    return (
                        <Category key={cat.id}>
                            <Item_Name>{cat.name}</Item_Name>
                            <Item_Name>{cat.type}</Item_Name>
                            <Item_Current>{cat.current_amount}</Item_Current>
                            <Item_Total>{cat.total_amount}</Item_Total>
                            {is_deleting &&
                                <Delete_Btn onClick={() => {delete_category(cat)}}>Del</Delete_Btn>
                            }
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

const Delete_Btn = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 8px;
    margin-right: 8px;
    color: red;
    cursor: pointer;
`