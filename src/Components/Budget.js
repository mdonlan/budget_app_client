import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Register } from './Register'

export function Budget() {
    return (
        <Wrapper>
            <Title>Budget</Title>
            <Link to="/register">register</Link>
            <Link to="/login">login</Link>
            <Category>
                <Category_Title>Immediate Obligations</Category_Title>
                <Category_Item>Rent</Category_Item>
                <Category_Item>Electric</Category_Item>
                <Category_Item>Water</Category_Item>
                <Category_Item>Heat</Category_Item>
                <Category_Item>Groceries</Category_Item>
                <Category_Item>Gas/Transportation</Category_Item>
            </Category>
            <div>True Expenses</div>
            <div>Credit Card Payments</div>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Title = styled.div`
    font-size: 18px;
`

const Category = styled.div``
const Category_Title = styled.div``
const Category_Item = styled.div``