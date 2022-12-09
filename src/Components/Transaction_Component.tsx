import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';
import {store, RootState, set_active_tag_name, Tag} from '../store';
import { format, startOfDay } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import history  from '../history';


export function Transaction_Component(props) {
    const [hovered, set_hovered] = useState<boolean>(false);
    const [started_delete, set_started_delete] = useState<boolean>(false);

    function handle_tag_click(tag: Tag) {
        console.log("about to set tag: ", tag);
        store.dispatch(set_active_tag_name(tag));
        history.push('tags');
        // history.go(0);
    }

    return (
        <Transaction_Wrapper 
            key={props.t.id} 
            onMouseEnter={() => {set_hovered(true)}} 
            onMouseLeave={() => {set_hovered(false)}}
            hovered={hovered}
        >
            <Transaction_Item>{props.t.name}</Transaction_Item>
            <Transaction_Item>{format(new Date(props.t.date), 'MM/dd/yyyy')}</Transaction_Item>
            <Transaction_Item>{props.t.value}</Transaction_Item>
            {props.t.tags.map((tag, i) => {
                return (
                    <Tag key={i}>
                        <div onClick={() => {handle_tag_click(tag)}}>{tag}</div>
                        {i < props.t.tags.length &&
                            <div>,&nbsp;</div>
                        }
                    </Tag>
                )
            })}
           {hovered &&
                <Delete_Btn icon={faCircleXmark} onClick={() => {set_started_delete(true)}}></Delete_Btn>
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

const Transaction_Wrapper = styled.div<{hovered: boolean}>`
    display: flex;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    background: ${props => props.hovered ? "#232323" : "none"};
`

const Delete_Btn = styled(FontAwesomeIcon)`
    cursor: pointer;
    position: absolute;
    left: calc(100% - 35px);
    color: red;
    opacity: 0.4;

    :hover {

    }
`

const Transaction_Item = styled.div`
    width: 20%;
`

const Tag = styled.div`
    // margin-right: 15px;
    display: flex;
`
