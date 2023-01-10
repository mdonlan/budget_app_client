import React, { useEffect, useState } from 'react';
import { get_time_period_data } from '../../api';
import styled from 'styled-components';
import { Time_Period } from '../../Types';
import { Weekly_Spending_Chart } from './Weekly_Spending_Chart';
import { Spending_By_Tag_Chart } from './Spending_By_Tag_Chart';
import { Spending_By_Transaction_Chart } from './Spending_By_Transaction_Chart';
import { Daily_Spending_Chart } from './Daily_Spending_Chart';
import { Yearly_Spending_Chart } from './Yearly_Spending_Chart';
import { Income_Expenses_Chart } from './Income_Expenses_Chart';
import { subMonths, addMonths, startOfMonth, format, startOfWeek, endOfMonth, endOfWeek, startOfYear, endOfYear, subWeeks, addWeeks, subYears, addYears } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

enum Change {
    PREV,
    NEXT
}

export function Time_Period_Data() {
    const [time_period, set_time_period] = useState<Time_Period>(Time_Period.WEEK);
    const [time_period_data, set_time_period_data] = useState(null);
    const [date, set_date] = useState<Date>(new Date());

    useEffect(() => {
        (async () => {
            const data = await get_time_period_data(time_period, date);
            set_time_period_data(data);
        })();
    }, [time_period, date]);

    // change the date to the prev or next date based on Time_Period
    function change_date(change: Change) {
        if (time_period == Time_Period.WEEK) {
            if (change == Change.PREV) set_date(subWeeks(date, 1));
            else if (change == Change.NEXT) set_date(addWeeks(date, 1));
        } else if (time_period == Time_Period.MONTH) {
            if (change == Change.PREV) set_date(subMonths(date, 1));
            else if (change == Change.NEXT) set_date(addMonths(date, 1));
        } else if (time_period == Time_Period.YEAR) {
            if (change == Change.PREV) set_date(subYears(date, 1));
            else if (change == Change.NEXT) set_date(addYears(date, 1));
        }
    }

    function get_range() {
        if (time_period == Time_Period.MONTH) {
            return format(startOfMonth(date), "dd-MM-yyyy") + " to " + format(endOfMonth(date), "dd-MM-yyyy");
        } else if (time_period == Time_Period.WEEK) {
            return format(startOfWeek(date), "dd-MM-yyyy") + " to " + format(endOfWeek(date), "dd-MM-yyyy");
        } else if (time_period == Time_Period.YEAR) {
            return format(startOfYear(date), "dd-MM-yyyy") + " to " + format(endOfYear(date), "dd-MM-yyyy");
        }
    }

    return (
        <Wrapper>
            <Select_Date>
                <div onClick={() => {change_date(Change.PREV)}}>&lt;</div>
                <div onClick={() => {change_date(Change.NEXT)}}>&gt;</div>
                <DatePicker selected={date} onChange={(new_date: Date) => set_date(new_date) } />
            </Select_Date>
            <Time_Periods>
                {/* <Time_Period_El active={time_period == Time_Period.DAY} onClick={() => set_time_period(Time_Period.DAY)}>Day</Time_Period_El> */}
                <Time_Period_El active={time_period == Time_Period.WEEK} onClick={() => set_time_period(Time_Period.WEEK)}>Week</Time_Period_El>
                <Time_Period_El active={time_period == Time_Period.MONTH} onClick={() => set_time_period(Time_Period.MONTH)}>Month</Time_Period_El>
                <Time_Period_El active={time_period == Time_Period.YEAR} onClick={() => set_time_period(Time_Period.YEAR)}>Year</Time_Period_El>
            </Time_Periods>
            {/* <Title>{Time_Period[time_period]}</Title> */}
            {time_period_data &&
                <Data>
                    <Data_Text>
                        <div>{get_range()}</div>
                        <Text># Transactions: {time_period_data.num_transactions}</Text>
                        <Text>Spent ${time_period_data.money_spent.toFixed(2)}</Text>
                    </Data_Text>
                    <Charts>
                        <Spending_By_Tag_Chart time_period={time_period} date={date}/>
                        <Spending_By_Transaction_Chart time_period={time_period} date={date}/>
                        <Income_Expenses_Chart time_period={time_period} date={date}/>
                        {/* {time_period == Time_Period.MONTH &&
                            <Weekly_Spending_Chart />
                        }
                        {time_period == Time_Period.WEEK &&
                            <Daily_Spending_Chart />
                        }
                        {time_period == Time_Period.YEAR &&
                            <Yearly_Spending_Chart />
                        } */}
                    </Charts>
                </Data>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Select_Date = styled.div`
    display: flex;
    margin-bottom: 20px;
`

const Title = styled.div`
    font-size: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: center;
`

const Time_Periods = styled.div`
    display: flex;
`

const Time_Period_El = styled.div<{active: boolean}>`
    margin-left: 5px;
    margin-right: 5px;
    padding: 12px;
    cursor: pointer;

    background: ${props => props.active ? "#2967b3" : '#222222'};

    :hover {
        background: #2967b3;
    }
`

const Data = styled.div`
    width: 100%;
    margin-bottom: 25px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Data_Text = styled.div`
    display: flex;
    margin-bottom: 25px;
`

const Text = styled.div`
    margin: 8px;
`

const Charts = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
