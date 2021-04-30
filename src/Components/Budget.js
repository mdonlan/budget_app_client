import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { get_categories } from '../api'
import { Add_Category } from './Add_Category'
import { Register } from './Register'

export function Budget() {
    const categories = useSelector(state => state.default.categories);

    useEffect(() => {
        get_categories();
    }, [])

    return (
        <Wrapper>
            <Title>Budget</Title>
            <Add_Category />
            <Header>INFLOW</Header>
            {categories.filter(c  => c.type == 'Inflow').map(cat => {
                return (
                    <Category key={cat.id}>
                        <Category_Title>{cat.name}</Category_Title>
                        <div>{cat.type}</div>
                        <div>{cat.current}</div>
                        <div>{cat.total}</div>
                    </Category>
                )
            })}
            <Header>OUTFLOW</Header>
            {categories.filter(c  => c.type == 'Outflow').map(cat => {
                return (
                    <Category key={cat.id}>
                        <Category_Title>{cat.name}</Category_Title>
                        <Item_Current>{cat.current}</Item_Current>
                        <Item_Total>{cat.total}</Item_Total>
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
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 18px;
`

const Category = styled.div`
    display: flex;
`

const Category_Title = styled.div`
    /* background: #dddddd; */
`

// const Category_Item = styled.div`
//     margin-left: 5px;
//     /* display: flex; */
// `

const Item_Name = styled.div`
    margin-left: 5px;
`

const Item_Current = styled.div`
    margin-left: 5px;
`

const Item_Total = styled.div``