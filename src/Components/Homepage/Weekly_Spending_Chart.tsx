import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { get_month_data } from '../../api';
import { startOfMonth, addWeeks, getWeekOfMonth, format, endOfMonth } from 'date-fns';
import { Transaction } from '../../store';
import { Week } from '../../Types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    // Title,
    Tooltip,
    Legend,
    Filler
);



// interface Month_Data {
//     weeks: Week[];
// };

export function Weekly_Spending_Chart() {

    const [chart_data, set_chart_data] = useState<any>({
        labels: [],
        datasets: []
    });
    const [options, set_options] = useState<ChartOptions>({
        plugins: {
            legend: {
                display: false
            },
        },
        elements: {
            line: {
                tension: 0.3
            }
        }
    });
    // const chart_ref = useRef(null);
   
    useEffect(() => {
       async function get_week_transactions() {
            const data = await get_month_data();
            const transactions: Transaction[] = data.transactions;

            const weeks: Week[] = [];

            const start_of_month = startOfMonth(new Date());
            const start_second_week = addWeeks(start_of_month, 1);
            const start_third_week = addWeeks(start_of_month, 2);
            const start_fouth_week = addWeeks(start_of_month, 3);
            const start_fifth_week = addWeeks(start_of_month, 4);

            const first_week: Week = {
                start: start_of_month,
                end: start_second_week,
                income: 0,
                expenses: 0,
                name: "First"
            };
            weeks.push(first_week);

            const second_week: Week = {
                start: start_second_week,
                end: start_third_week,
                income: 0,
                expenses: 0,
                name: "Second"
            };
            weeks.push(second_week);

            const third_week: Week = {
                start: start_third_week,
                end: start_fouth_week,
                income: 0,
                expenses: 0,
                name: "Third"
            };
            weeks.push(third_week);
            
            const fourth_week: Week = {
                start: start_fouth_week,
                end: start_fifth_week,
                income: 0,
                expenses: 0,
                name: "Fourth"
            };
            weeks.push(fourth_week);

            const fifth_week: Week = {
                start: start_fifth_week,
                end: endOfMonth(new Date()),
                income: 0,
                expenses: 0,
                name: "Fifth"
            };
            weeks.push(fifth_week);
           
            console.log(weeks)
            
            
            transactions.forEach(t => {
                const week_in_month = getWeekOfMonth(new Date(t.date));
                if (t.is_inflow) {

                } else {
                    weeks[week_in_month - 1].expenses += t.value;
                }
            });

            const new_chart_data: ChartData = {
                labels: weeks.map(w => w.name + " - " + format(w.start, "d") + " - " + format(w.end, "d")),
                datasets: [
                    {
                        label: "Weekly Expenses",
                        data: weeks.map(w => w.expenses),
                        borderColor: "green",
                        borderWidth: 1,
                        backgroundColor: "rgba(0, 200, 0, 0.2)",
                        fill: true,
                    }
                ]
            }
        
            set_chart_data(new_chart_data);        
       }

       get_week_transactions();
    }, []);

    return (
        <Weekly_Spending_Chart_Wrapper>
            <Chart_Title>Spending This Month</Chart_Title>
            <Chart>
                <Line options={options} data={chart_data} />
            </Chart>
        </Weekly_Spending_Chart_Wrapper>
    )
}

const Weekly_Spending_Chart_Wrapper = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Chart = styled.div`
    width: 100%;
    width: 100%;
`

const Chart_Title = styled.div`
    color: #dddddd;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 24px;
`