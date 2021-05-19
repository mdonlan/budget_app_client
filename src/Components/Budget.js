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
            <Title>Budget</Title>
            <Add_Category />
            <div onClick={() => {set_is_deleting(!is_deleting)}}>{is_deleting ? "cancel" : "delete category"}</div>
            {/* <Header>INFLOW</Header>
            {categories.filter(c  => c.type == 'Inflow').map(cat => {
                return (
                    <Category key={cat.id}>
                        <Category_Title>{cat.name}</Category_Title>
                        <Item_Current>{cat.current_amount}</Item_Current>
                        <Item_Total>{cat.total_amount}</Item_Total>
                        {is_deleting && 
                            <div onClick={() => {delete_category(cat)}}>delete</div>
                        }
                    </Category>
                )
            })}
            <Header>OUTFLOW</Header> */}
            {categories.filter(c  => c.type == 'Outflow').map(cat => {
                return (
                    <Category key={cat.id}>
                        <Item_Name>{cat.name}</Item_Name>
                        <Item_Current>Spent: {cat.current_amount}</Item_Current>
                        <Item_Total>Budgeted: {cat.total_amount}</Item_Total>
                    </Category>
                )
            })}
            {/* {categories.map((cat, i) => {
                return (
                    <Category key={i}>
                        <Category_Title>{cat.name}</Category_Title>
                    </Category>
                )
            })} */}
            {/* <Category>
                <Category_Title>Immediate Obligations</Category_Title>
                <Category_Item>
                    <Item_Name>Rent</Item_Name>
                    <Item_Current>650</Item_Current>
                    <div>/</div>
                    <Item_Total>650</Item_Total>
                </Category_Item>
                <Category_Item>Electric</Category_Item>
                <Category_Item>Water</Category_Item>
                <Category_Item>Heat</Category_Item>
                <Category_Item>Groceries</Category_Item>
                <Category_Item>Gas/Transportation</Category_Item>
            </Category>
            <Category>
                <Category_Title>True Expenses</Category_Title>
                <Category_Item>Credit Card Payments</Category_Item>
            </Category> */}
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Title = styled.div`
    font-size: 18px;
`

const Header = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 18px;
`

const Category = styled.div`
    display: flex;
`

const Item_Name = styled.div`
    width: 200px;
`

const Item_Current = styled.div`
    width: 200px;
`

const Item_Total = styled.div`
`