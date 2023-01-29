import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Transaction_Component } from './Transaction_Component';
import { Transaction } from '../store'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    transactions: Transaction[]
};

enum Sort_Type {
    ID,
    DATE_NEW_TO_OLD,
    DATE_OLD_TO_NEW
};

export const Transactions_Table: React.FC<Props> = ({transactions = []}: Props) => {
    const [table_sort_type, set_table_sort_type] = useState(Sort_Type.ID);
    const [sorted_transactions, set_sorted_transactions] = useState(transactions);
    const [date_sort, set_date_sort] = useState(Sort_Type.DATE_NEW_TO_OLD);

    function sort(sort_type) {
        const copy = JSON.parse(JSON.stringify(transactions));

        if (sort_type == Sort_Type.DATE_NEW_TO_OLD) {
            console.log("Sort: New to Old");
            copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            set_table_sort_type(Sort_Type.DATE_OLD_TO_NEW);
            set_date_sort(Sort_Type.DATE_OLD_TO_NEW);
        } else if (sort_type == Sort_Type.DATE_OLD_TO_NEW) {
            console.log("Sort: Old to New");
            copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            set_table_sort_type(Sort_Type.DATE_NEW_TO_OLD);
            set_date_sort(Sort_Type.DATE_NEW_TO_OLD);
        }

        set_sorted_transactions(copy);
    }

    useEffect(() => {
        set_sorted_transactions(transactions)
    }, [transactions]);

    return (
        <Wrapper>
            <Col_Headers>
                <Name_Header>Name</Name_Header>
                <Date_Header onClick={() => sort(date_sort)}>
                    Date
                    {table_sort_type == Sort_Type.DATE_NEW_TO_OLD  && <Styled_Icon icon={faArrowDown} />}
                    {table_sort_type == Sort_Type.DATE_OLD_TO_NEW  && <Styled_Icon icon={faArrowUp} />}
                </Date_Header>
                <Inflow_Header>Inflow</Inflow_Header>
                <Transaction_Col_Header>Value</Transaction_Col_Header>
                <Transaction_Col_Header>Tags</Transaction_Col_Header>
            </Col_Headers>

            <Transactions_List>
                {sorted_transactions.slice(0).reverse().map((t, i) => {
                    return <Transaction_Component t={t} key={i}/>
                })}
            </Transactions_List>
        </Wrapper>
    )
}

const Wrapper = styled.div` 
    width: 100%;
`

const Col_Headers = styled.div`
    display: flex;
    // justify-content: space-around;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    position: relative;
    color: white;
`

const Transaction_Col_Header = styled.div`
    font-size: 18px;
    // width: 20%;
    font-variant: small-caps;
    display: flex;
    // justify-content: center;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
`

const Inflow_Header = styled(Transaction_Col_Header)`
    width: 50px;
`



const Name_Header = styled(Transaction_Col_Header)`
    width: 20%;
    // text-align: center;
    display: flex;
    justify-content: center;
`

const Transaction_Col_Header_Sortable = styled(Transaction_Col_Header)`
    cursor: pointer;
    transition: 0.2s;

    :hover {
        background: rgba(135, 135, 135, 0.2);
    }
`

const Date_Header = styled(Transaction_Col_Header_Sortable)`
    width: 20%;
    display: flex;
    justify-content: center;
`

const Styled_Icon = styled(FontAwesomeIcon)`
    margin-left: 4px;
`

const Transactions_List = styled.div`
    // min-height: 100%;
    // overflow-y: auto;
    // padding-left: 100px;
`