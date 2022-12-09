import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import {store, RootState, Tag, set_active_tag_name } from '../store';
import { Transaction_Component } from './Transaction_Component';


export function Tags() {
    const active_tag: string = useSelector((state: RootState) => state.default.active_tag_name);
    const tags = useSelector((state: RootState) => state.default.tags);
    const transactions = useSelector((state: RootState) => state.default.transactions);

    useEffect(() => {

    }, [active_tag]);

    function is_matching_transaction(t) {
        for (let tag of t.tags) {
            if (tag == active_tag) {
                return true;
            }
        }
        return false;
    }

    return (
        <Wrapper>
            <Title>Tags</Title>
            
            {!active_tag &&
                <No_Active_Tag>Select a tag to view related transactions</No_Active_Tag>
            }
            {active_tag &&
                <Tag_El active={true}>Active Tag: {active_tag}</Tag_El>
            }

            <All_Tags>
                {tags.map(tag => {
                    return (
                        <Tag_El key={tag.id} active={active_tag ? active_tag == tag.value ? true : false : false} onClick={() => {store.dispatch(set_active_tag_name(tag.value))}}>{tag.value}</Tag_El>
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

const Tag_El = styled.div<{active: boolean}>`
    background: ${props => props.active ? "#295dab" : props.theme.background};
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 14px;
    padding: 8px;
    cursor: pointer;
    margin-bottom: 12px;
    
    :hover {
        background: ${props => props.active ? "#295dab" : "#333333"};
    }
`

const No_Active_Tag = styled.div`
    margin-bottom: 12px;
    padding: 8px;
`

const Matching_Transactions = styled.div`
    margin-top: 24px;
    width: 100%;
`

const Matching_Transactions_Title = styled.div`
    font-size: 24px;
    margin-bottom: 12px;
`

const Col_Headers = styled.div`
    display: flex;
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