// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { get_month_data } from '../api';
// import { Transaction } from '../store';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { subMonths, addMonths } from 'date-fns';
// import { Spending_By_Tag_Chart } from './Homepage/Spending_By_Tag_Chart';
// import { Time_Period } from '../Types';

// enum Change {
//     PREV,
//     NEXT
// }

// export function Month() {

//     const [income, set_income] = useState(0);
//     const [expenses, set_expenses] = useState(0);
//     const [date, set_date] = useState<Date>(new Date());

//     useEffect(() => {
//         const get_data = async () => {
//             const data = await get_month_data(date);
//             const expenses = data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total : total + t.value; }, 0);
//             set_expenses(expenses);
//             const income = data.transactions.reduce((total: number, t: Transaction) => { return t.is_inflow ? total + t.value : total; }, 0);
//             set_income(income);
//         }

//         get_data();
//     }, [date]);

//     function change_month(change: Change) {
//         console.log("change_month");
//         let new_date = null;

//         if (change == Change.PREV) {
//             new_date = subMonths(date, 1);
//         } else if (change == Change.NEXT) {
//             new_date = addMonths(date, 1);
//         }

//         set_date(new_date);
//     }

//     return (
//         <Wrapper>
//             <div>Month</div>
//             <div>Income: {income}</div>
//             <div>Expenses: {expenses}</div>
//             <div onClick={() => {change_month(Change.PREV)}}>&lt;</div>
//             <div onClick={() => {change_month(Change.NEXT)}}>&gt;</div>
//             <DatePicker selected={date} onChange={(new_date: Date) => set_date(new_date) } />
//             <Spending_By_Tag_Chart time_period={Time_Period.MONTH} />
//         </Wrapper>
//     )
// }

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `