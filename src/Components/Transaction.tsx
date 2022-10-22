import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';
import { RootState } from '../store';
import { format, startOfDay } from 'date-fns';

export function Transaction_Component(props) {
    const [hovered, set_hovered] = useState<boolean>(false);
    const [started_delete, set_started_delete] = useState<boolean>(false);
    return (
        <Transaction_Wrapper key={props.t.id} onMouseEnter={() => {set_hovered(true)}} onMouseLeave={() => {set_hovered(false)}}>
            <Transaction_Item>{props.t.name}</Transaction_Item>
            <Transaction_Item>{format(new Date(props.t.date), 'MM/dd/yyyy')}</Transaction_Item>
            <Transaction_Item>{props.t.value}</Transaction_Item>
            {props.t.tags.map((tag, i) => {
                return (
                    <Tag key={i}>
                        <div>{tag}</div>
                        {i < props.t.tags.length &&
                            <div>,&nbsp;</div>
                        }
                    </Tag>
                )
            })}
           {hovered &&
                <Delete_Btn onClick={() => {set_started_delete(true)}}>X</Delete_Btn>
            }
            {started_delete &&
                <div>
                    <div onClick={() => {delete_transaction(props.t)}}>yes</div>
                    <div onClick={() => {set_started_delete(false)}}>no</div>
                </div>
            }
        </Transaction_Wrapper>
    )
}

const Delete_Btn = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 8px;
    margin-right: 8px;
    color: red;
    cursor: pointer;
    background: #333333;
    position: absolute;
    left: calc(100% - 100px);
    top: 0px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Transaction_Wrapper = styled.div`
    display: flex;
    // margin-top: 8px;
    // margin-bottom: 8px;
    // margin-left: 8px;
    // padding: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
`

const Transaction_Item = styled.div`
    width: 20%;
`

const Tag = styled.div`
    // margin-right: 15px;
    display: flex;
`
