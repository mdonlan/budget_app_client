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
    ID_NEW_TO_OLD,
    ID_OLD_TO_NEW,
    DATE_NEW_TO_OLD,
    DATE_OLD_TO_NEW,
    // ADDED_OLD_TO_NEW,
    // ADDED_NEW_TO_OLD
};

export const Transactions_Table: React.FC<Props> = ({transactions = []}: Props) => {
    const [table_sort_type, set_table_sort_type] = useState(Sort_Type.ID_NEW_TO_OLD);
    const [sorted_transactions, set_sorted_transactions] = useState(transactions);
    const [date_sort, set_date_sort] = useState(Sort_Type.DATE_NEW_TO_OLD);
    const [added_sort, set_added_sort] = useState(Sort_Type.ID_NEW_TO_OLD);

    function sort(sort_type) {

        console.log(sort_type)

        
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

        if (sort_type == Sort_Type.ID_NEW_TO_OLD) {
            copy.sort((a, b) => b.id - a.id);
            set_table_sort_type(Sort_Type.ID_OLD_TO_NEW);
            set_added_sort(Sort_Type.ID_OLD_TO_NEW);
        } else if (sort_type == Sort_Type.ID_OLD_TO_NEW) {
            copy.sort((a, b) => a.id - b.id);
            set_table_sort_type(Sort_Type.ID_NEW_TO_OLD);
            set_added_sort(Sort_Type.ID_NEW_TO_OLD);
        }

        set_sorted_transactions(copy);
    }

    useEffect(() => {
        set_sorted_transactions(transactions)
    }, [transactions]);

    return (
        <Wrapper>
            <Col_Headers>
                <Transactions_Added_Header onClick={() => sort(added_sort)}>
                    ID
                    {table_sort_type == Sort_Type.ID_NEW_TO_OLD  && <Styled_Icon icon={faArrowDown} />}
                    {table_sort_type == Sort_Type.ID_OLD_TO_NEW  && <Styled_Icon icon={faArrowUp} />}
                </Transactions_Added_Header>
                <Name_Header>Name</Name_Header>
                <Date_Header onClick={() => sort(date_sort)}>
                    Date
                    {table_sort_type == Sort_Type.DATE_NEW_TO_OLD  && <Styled_Icon icon={faArrowDown} />}
                    {table_sort_type == Sort_Type.DATE_OLD_TO_NEW  && <Styled_Icon icon={faArrowUp} />}
                </Date_Header>
                <Inflow_Header>Inflow</Inflow_Header>
                <Transaction_Value_Header>Value</Transaction_Value_Header>
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
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    position: relative;
    color: white;
`

const Transaction_Col_Header = styled.div`
    font-size: 18px;
    font-variant: small-caps;
    display: flex;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
`

const Inflow_Header = styled(Transaction_Col_Header)`
    width: 100px;
`


const Transaction_Value_Header = styled(Transaction_Col_Header)`
    width: 150px;
`

const Transactions_Added_Header = styled(Transaction_Col_Header)`
    width: 100px;

    :hover {
        background: rgba(135, 135, 135, 0.2);
    }
`


const Name_Header = styled(Transaction_Col_Header)`
    width: 20%;
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
    
`