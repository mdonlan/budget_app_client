import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { RootState } from '../store';
import { Transaction_Component } from './Transaction';


export function Tags() {
    const [active_tag, set_active_tag] = useState(null);
    const tags = useSelector((state: RootState) => state.default.tags);
    const transactions = useSelector((state: RootState) => state.default.transactions);

    function is_matching_transaction(t) {
        for (let tag of t.tags) {
            if (tag == active_tag.value) {
                return true;
            }
        }
        return false;
    }

    return (
        <Wrapper>
            <Title>Tags</Title>
            {active_tag &&
                <Active_Tag>Active Tag: {active_tag.value}</Active_Tag>
            }

            <All_Tags>
                {tags.map(tag => {
                    return (
                        <Tag key={tag.id} onClick={() => {set_active_tag(tag)}}>{tag.value}</Tag>
                    )
                })}
            </All_Tags>

            {active_tag &&
                <Matching_Transactions>
                    <Matching_Transactions_Title>Matching Transactions:</Matching_Transactions_Title>
                    <Col_Headers>
                        <Transaction_Col_Header>Name</Transaction_Col_Header>
                        <Transaction_Col_Header>Date</Transaction_Col_Header>
                        <Transaction_Col_Header>Value</Transaction_Col_Header>
                        <Transaction_Col_Header>Tags</Transaction_Col_Header>
                    </Col_Headers>
                    {transactions.filter(t => is_matching_transaction(t)).map(t => {
                        return (
                            <Transaction_Component t={t} key={t.id}></Transaction_Component>
                        )
                    })}
                </Matching_Transactions>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Title = styled.div`
    font-size: 32px;
    margin-bottom: 24px;
`

const All_Tags = styled.div`
    display: flex;
`

const Tag = styled.div`
    background: #222222;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 14px;
    padding: 8px;
    cursor: pointer;

    :hover {
        background: #333333;
    }
`

const Active_Tag = styled(Tag)`
    margin-bottom: 12px;
    cursor: auto;
    :hover {
        background: #222222; // cancel from normal tag style
    }
`

const Matching_Transactions = styled.div`
    margin-top: 24px;
    width: 100%;
`

const Matching_Transactions_Title = styled.div`
    font-size: 24px;
    margin-bottom: 12px;
`

const Transaction = styled.div`
    
`
const Col_Headers = styled.div`
    display: flex;
    // margin-top: 8px;
    // margin-bottom: 8px;
    // margin-left: 8px;
    // padding: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    position: relative;
`

const Transaction_Col_Header = styled.div`
    font-size: 18px;
    width: 20%;
    font-variant: small-caps;
    // color: white;
`