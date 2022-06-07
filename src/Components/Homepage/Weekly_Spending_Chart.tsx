import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData, DatasetController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { get_month_data } from '../../api';
import { startOfMonth, addWeeks, getWeekOfMonth, format, endOfMonth } from 'date-fns';
import { Transaction } from '../../store';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Week {
    start: Date;
    end: Date;
    amount: number;
    name: string; // first, second, etc
};

// interface Month_Data {
//     weeks: Week[];
// };

export function Weekly_Spending_Chart() {

    const [chart_data, set_chart_data] = useState<any>({
        labels: [],
        datasets: []
    });
    const [options, set_options] = useState<any>({});
    // const chart_ref = useRef(null);
   
    useEffect(() => {
       async function get_week_transactions() {
            const data = await get_month_data();
            const transactions: Transaction[] = data.transactions;

            const weeks: Week[] = [];

            const start_of_month = startOfMonth(new Date());
            const start_second_week = addWeeks(start_of_month, 1);
            const start_third_week = addWeeks(start_of_month, 2);
            const start_last_week = addWeeks(start_of_month, 3);

            const first_week: Week = {
                start: start_of_month,
                end: start_second_week,
                amount: 0,
                name: "First"
            };
            weeks.push(first_week);

            const second_week: Week = {
                start: start_second_week,
                end: start_third_week,
                amount: 0,
                name: "Second"
            };
            weeks.push(second_week);

            const third_week: Week = {
                start: start_third_week,
                end: start_last_week,
                amount: 0,
                name: "Third"
            };
            weeks.push(third_week);
            
            const last_week: Week = {
                start: start_last_week,
                end: endOfMonth(new Date()),
                amount: 0,
                name: "Fourth"
            };
            weeks.push(last_week);
           
            console.log(weeks)
            
            
            transactions.forEach(t => {
                const week_in_month = getWeekOfMonth(new Date(t.date));
                console.log(week_in_month)
                weeks[week_in_month - 1].amount += t.value;
            });

            const new_chart_data: ChartData = {
                labels: weeks.map(w => w.name + " - " + format(w.start, "d") + " - " + format(w.end, "d")),
                datasets: [
                    {
                        label: "Weekly Spending",
                        data: weeks.map(w => w.amount),
                        borderColor: "red",
                        borderWidth: 1
                        // backgroundColor: "orange"
                    }
                ]
            }
        
            set_chart_data(new_chart_data);        
       }

       get_week_transactions();
    }, []);

    return (
        <Weekly_Spending_Chart_Wrapper>
            <Line options={options} data={chart_data} />
        </Weekly_Spending_Chart_Wrapper>
    )
}

const Weekly_Spending_Chart_Wrapper = styled.div`

`