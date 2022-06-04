import React, { useEffect, useState } from 'react';
import { get_month_data, get_week_data, get_day_data } from '../../api';
import styled from 'styled-components';

export function Expenses() {
    const [month_expenses, set_month_expenses] = useState<number>(0);
    const [week_expenses, set_week_expenses] = useState<number>(0);
    const [day_expenses, set_day_expenses] = useState<number>(0);

    useEffect(() => {
        async function get_data() {
            const month_data = await get_month_data();
            set_month_expenses(month_data.transactions.reduce((total, t) => total + t.value, 0));

            const week_data = await get_week_data();
            set_week_expenses(week_data.transactions.reduce((total, t) => total + t.value, 0));

            const day_data = await get_day_data();
            set_day_expenses(day_data.transactions.reduce((total, t) => total + t.value, 0));
        }
        
        get_data();
    }, []);

    return (
        <Expenses_Wrapper>
            <Expenses_Top>
                <Expenses_Title>Total Expenses</Expenses_Title>
            </Expenses_Top>
            <Expenses_Bot>
                <Time_Period>
                    <Expense_Time_Title>Day</Expense_Time_Title>
                    <Expense_Value><Dollar_Sign>$</Dollar_Sign>{day_expenses.toFixed(2)}</Expense_Value>
                </Time_Period>
                <Time_Period>
                    <Expense_Time_Title>Week</Expense_Time_Title>
                    <Expense_Value><Dollar_Sign>$</Dollar_Sign>{week_expenses.toFixed(2)}</Expense_Value>
                </Time_Period>
                <Time_Period>
                    <Expense_Time_Title>Month</Expense_Time_Title>
                    <Expense_Value><Dollar_Sign>$</Dollar_Sign>{month_expenses.toFixed(2)}</Expense_Value>
                </Time_Period>
            </Expenses_Bot>
            
            
        </Expenses_Wrapper>
    )
}

const Expenses_Wrapper = styled.div`
    // display: flex;
    // flex-direction: column;
    // padding: 20px;
    // background: rgba(255, 255, 255, 0.09);
    // width: 400px;
    // margin-left: 10px;
    // margin-right: 10px;
    // border-radius: 3px;
`

const Expenses_Title = styled.div`
    color: #b5b5b5;
    margin-bottom: 30px;
`;

const Expenses_Top = styled.div`
    display: flex;
    justify-content: center;
    color: #b5b5b5;
    margin-bottom: 20px;
`

const Expenses_Bot = styled.div`
    display: flex;
    // justify-content: space-around;
    color: #dddddd;
`

const Time_Period = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    padding-left: 5px;
    padding-right: 5px;
`


const Expense_Time_Title = styled.div`
    color: #b5b5b5;
    margin-bottom: 10px;
`
const Expense_Value = styled.div`
    font-size: 30px;
`

const Dollar_Sign = styled.sup`
    font-size: 16px;
`