import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { delete_transaction } from '../api';
import { Add_Transaction } from './Add_Transaction';
import {store, RootState, set_active_tag_name, Tag, set_existing_transaction} from '../store';
import { format, startOfDay } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPen, faCheck, faPiggyBank, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import history  from '../history';


export function Transaction_Component(props) {
    const [hovered, set_hovered] = useState<boolean>(false);
    const [started_delete, set_started_delete] = useState<boolean>(false);
    const dispatch = useDispatch();

    function handle_tag_click(tag: Tag) {
        console.log("about to set tag: ", tag);
        store.dispatch(set_active_tag_name(tag));
        history.push('tags');
        // history.go(0);
    }

    function handle_edit() {
        dispatch(set_existing_transaction(props.t));
        history.push("/add_transaction");
    }

    return (
        <Transaction_Wrapper 
            key={props.t.id} 
            onMouseEnter={() => {set_hovered(true)}} 
            onMouseLeave={() => {set_hovered(false)}}
            hovered={hovered}
        >
            <Transaction_Name>{props.t.name}</Transaction_Name>
            <Transaction_Item>{format(new Date(props.t.date), 'MM/dd/yyyy')}</Transaction_Item>
            <Transaction_Inflow>{props.t.is_inflow ? <FontAwesomeIcon color='rgba(41, 194, 56, 0.6)' icon={faPiggyBank}/> : <FontAwesomeIcon color='rgba(194, 66, 41, 0.6)' icon={faCreditCard}/>}</Transaction_Inflow>
            <Transaction_Item>{props.t.value}</Transaction_Item>
            <Tags_Wrapper>
                {props.t.tags.map((tag, i) => {
                    return (
                            <Tag key={i}>
                                <div onClick={() => {handle_tag_click(tag)}}>{tag}</div>
                            </Tag>
                    )
                })}
            </Tags_Wrapper>
           {hovered &&
                <>
                <Edit_Btn icon={faPen} onClick={() => {handle_edit()}}></Edit_Btn>
                <Delete_Btn icon={faCircleXmark} onClick={() => {set_started_delete(true)}}></Delete_Btn>
                </>
            }
            {started_delete &&
                <div>
                    <div onClick={() => {delete_transaction(props.t); set_started_delete(false);}}>yes</div>
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
    padding-left: 8px;
    padding-right: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    background: ${props => props.hovered ? "#414758" : "none"};
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

const Edit_Btn = styled(FontAwesomeIcon)`
    cursor: pointer;
    position: absolute;
    left: calc(100% - 65px);
    color: gray;
    opacity: 0.4;

    :hover {

    }
`

const Transaction_Name = styled.div`
    width: calc(20% - 50px);
    // text-align: center;
    padding-left: 50px;
`

const Transaction_Inflow = styled.div`
    width: 100px;
    // padding-left: 50px;
`

const Transaction_Item = styled.div`
    width: 20%;
    text-align: center;
`

const Tags_Wrapper = styled.div`
    display: flex;
    width: 20%;
    overflow: scroll;
`

const Tag = styled.div`
    display: flex;
    cursor: pointer;
    padding: 3px;
    // width: 100%;

    :hover {
        background: #363b4a;
    }
`
