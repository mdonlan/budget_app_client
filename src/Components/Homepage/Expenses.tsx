import React, { useEffect, useState } from 'react';
import { get_month_data, get_week_data, get_day_data } from '../../api';
import styled from 'styled-components';
import { Transaction } from '../../store';

export function Expenses() {
    const [month_expenses, set_month_expenses] = useState<number>(0);
    const [week_expenses, set_week_expenses] = useState<number>(0);
    const [day_expenses, set_day_expenses] = useState<number>(0);
    const [month_income, set_month_income] = useState<number>(0);
    const [week_income, set_week_income] = useState<number>(0);
    const [day_income, set_day_income] = useState<number>(0);

    useEffect(() => {
        async function get_data() {
            const month_data = await get_month_data();
            if (month_data) {
                const expenses = month_data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total : total + t.value; }, 0);
                console.log(month_data)
                console.log("month expenses = " + expenses)
                set_month_expenses(expenses);
                const income = month_data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total + t.value : total; }, 0);
                set_month_income(income);
            }

            const week_data = await get_week_data();
            if (week_data) {
                const expenses = week_data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total : total + t.value; }, 0);
                set_week_expenses(expenses);
                const income = week_data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total + t.value : total; }, 0);
                set_week_income(income);
            }

            const day_data = await get_day_data();
            if (day_data) {
                const expenses = day_data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total : total + t.value; }, 0);
                set_day_expenses(expenses);
                const income = day_data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total + t.value : total; }, 0);
                set_day_income(income);
            }
        }
        
        get_data();
    }, []);

    return (
        <Expenses_Wrapper>
            <Expenses_Top>
                <Expenses_Title>Income & Expenses</Expenses_Title>
            </Expenses_Top>
            <Expenses_Bot>
               <Expenses_List>
               <Title>Expenses</Title>
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
               </Expenses_List>
               <Income_List>
               <Title>Income</Title>
                <Time_Period>
                        <Expense_Time_Title>Day</Expense_Time_Title>
                        <Expense_Value><Dollar_Sign>$</Dollar_Sign>{day_income.toFixed(2)}</Expense_Value>
                    </Time_Period>
                    <Time_Period>
                        <Expense_Time_Title>Week</Expense_Time_Title>
                        <Expense_Value><Dollar_Sign>$</Dollar_Sign>{week_income.toFixed(2)}</Expense_Value>
                    </Time_Period>
                    <Time_Period>
                        <Expense_Time_Title>Month</Expense_Time_Title>
                        <Expense_Value><Dollar_Sign>$</Dollar_Sign>{month_income.toFixed(2)}</Expense_Value>
                    </Time_Period>
               </Income_List>
            </Expenses_Bot>
        </Expenses_Wrapper>
    )
}

const Expenses_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    // background: rgba(87, 88, 125, 0.10);
    // padding: 30px;
`

const Expenses_Title = styled.div`
    color: #dddddd;
    // margin-top: 12px;
    // margin-bottom: 12px;
    font-size: 28px;
`

const Expenses_Top = styled.div`
    display: flex;
    justify-content: center;
    color: #b5b5b5;
    margin-bottom: 20px;
`

const Expenses_Bot = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    color: #dddddd;
`

const Title = styled.div`
    font-size: 24px;
    width: 125px;
`

const Expenses_List = styled.div`
    display: flex;
    align-items: center;
    // justify-content: center;
`

const Income_List = styled.div`
    display: flex;
    align-items: center;
    // justify-content: center;
`

const Time_Period = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 20px;
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