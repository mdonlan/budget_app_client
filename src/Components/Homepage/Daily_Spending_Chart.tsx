import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData, DatasetController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { get_week_data } from '../../api';
import { startOfWeek, nextDay, isSameDay, toDate, startOfDay, format, subDays } from 'date-fns';
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

interface Day_Of_Week {
    date: Date,
    amount: number
};

// interface Dataset {
//     label: string;
//     data: any;
//     borderColor: string;
//     background_color: string;
// };


// interface Chart_Data {
//     labels: string[],
//     datasets: [];
// };

const starting_chart_data: ChartData = {
    labels: [],
    datasets: []
};

interface Chart_Options {

};

const starting_options = {
    scales: {
        y: {
            // min: -200,
            // max: 200
        }
    }
};

export function Daily_Spending_Chart() {

    const [chart_data, set_chart_data] = useState<any>(starting_chart_data);
    const [options, set_options] = useState<any>(starting_options);
    const chart_ref = useRef(null);
   
    useEffect(() => {
       async function get_week_transactions() {
            const data = await get_week_data();
            const transactions: Transaction[] = data.transactions;
            
            const days = [];
            const starting_day = subDays( startOfWeek(new Date()), 1);
            
            // console.log(starting_day)
            // console.log(starting_day.getDay() - 1)
            
            for (let i = 0; i < 7; i++) {
                let new_day: Day_Of_Week = {
                    date: nextDay(starting_day, i as Day),
                    amount: 0
                }
                days.push(new_day);
            }

            // console.log("transactions");
            // console.log(transactions);
            // console.log("days")
            // console.log(days)
            transactions.forEach((t: Transaction) => {
                days.forEach((d: Day_Of_Week) => {
                    const formattted_day_date = startOfDay(new Date(d.date));
                    const formattted_transaction_date = startOfDay(new Date(t.date));
                    // console.log("day date: " + formattted_day_date);
                    // console.log("transaction date: " + formattted_transaction_date);
                    if (isSameDay(startOfDay(new Date(d.date)), startOfDay(new Date(t.date)))) {
                        d.amount += t.value;
                    } else {
                    }
                });
            });

            // console.log(days);

            const new_chart_data: ChartData = {
                labels: days.map(d => format(d.date, 'E')),
                datasets: [
                    {
                        label: "Daily Spending",
                        data: days.map(d => d.amount),
                        borderColor: "red",
                        borderWidth: 1
                        // backgroundColor: "orange"
                    }
                ]
            }
            // console.log(new_chart_data)
            
            set_chart_data(new_chart_data);
            // console.log(chart_ref)
            chart_ref.current.update();
            // console.log(chart_ref.current.data)

            
       }

       get_week_transactions();
    }, []);

    return (
        <Daily_Spending_Chart_Wrapper>
            <Line options={options} data={chart_data} ref={chart_ref}/>
        </Daily_Spending_Chart_Wrapper>
    )
}

const Daily_Spending_Chart_Wrapper = styled.div`

`

/*

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function App() {
  return <Line options={options} data={data} />;
}

*/