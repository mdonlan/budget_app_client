import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData, DatasetController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { get_month_data, get_week_data, get_year_data } from '../../api';
import { startOfWeek, nextDay, isSameDay, toDate, startOfDay, format, subDays, startOfMonth, addWeeks, endOfMonth, getWeekOfMonth } from 'date-fns';
import { Transaction } from '../../store';
import { Time_Period, Week } from '../../Types';

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
	expenses: number,
    income: number
};

const starting_chart_data: ChartData = {
	labels: [],
	datasets: []
};

export function Income_Expenses_Chart(props: {time_period: Time_Period}) {

	const [chart_data, set_chart_data] = useState<any>(starting_chart_data);
	const [options, set_options] = useState<ChartOptions>({
		plugins: {
			legend: {
				display: false
			}
		},
		elements: {
			line: {
				tension: 0.3
			}
		}
	});
	const chart_ref = useRef(null);

    async function setup_week() {
        const data = await get_week_data();
        const transactions: Transaction[] = data.transactions;

        const days = [];
        const starting_day = subDays(startOfWeek(new Date()), 1);

        for (let i = 0; i < 7; i++) {
            let new_day: Day_Of_Week = {
                date: nextDay(starting_day, i as Day),
                expenses: 0,
                income: 0
            }
            days.push(new_day);
        }

        transactions.forEach((t: Transaction) => {
            days.forEach((d: Day_Of_Week) => {
                const formattted_day_date = startOfDay(new Date(d.date));
                const formattted_transaction_date = startOfDay(new Date(t.date));
                if (isSameDay(startOfDay(new Date(d.date)), startOfDay(new Date(t.date)))) {
                    if (t.is_inflow) {
                        d.income += t.value;
                    } else {
                        d.expenses += t.value;
                    }
                } else {
                }
            });
        });

        const new_chart_data: ChartData = {
            labels: days.map(d => format(d.date, 'E')),
            datasets: [
                {
                    label: "Weekly Expenses",
                    data: days.map(d => d.expenses),
                    borderColor: "rgba(84, 48, 217, 1)",
                    borderWidth: 1,
                    backgroundColor: "rgba(84, 48, 217, 0.2)",
                    fill: true
                },
                {
                    label: "Weekly Income",
                    data: days.map(d => d.income),
                    borderColor: "rgb(53, 162, 235)",
                    borderWidth: 1,
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    fill: true
                }
            ]
        }
        set_chart_data(new_chart_data);
        chart_ref.current.update();
    }

    async function setup_month() {
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
                weeks[week_in_month - 1].income += t.value;
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
                },
                {
                    label: "Weekly Income",
                    data: weeks.map(w => w.income),
                    borderColor: "red",
                    borderWidth: 1,
                    backgroundColor: "rgba(200, 0, 0, 0.2)",
                    fill: true,
                }
            ]
        }
    
        set_chart_data(new_chart_data); 
        chart_ref.current.update();       
    //    }
    }
    

	useEffect(() => {
		async function get_data() {
			
            
            if (props.time_period == Time_Period.YEAR) {
                // data = await get_year_data();
            } else if (props.time_period == Time_Period.MONTH) {
                // data = await get_month_data();
                console.log("setup month")
                setup_month();
            } else if (props.time_period == Time_Period.WEEK) {
                // data = await get_week_data();
                console.log("setup week")
                setup_week();
            }
			
            

			
		}

		get_data();

	}, [props.time_period]);

	return (
		<Daily_Spending_Chart_Wrapper>
			<Chart_Title>Income & Expenses</Chart_Title>
			<Chart>
				<Line data={chart_data} ref={chart_ref} options={options} />
			</Chart>
		</Daily_Spending_Chart_Wrapper>
	)
}

const Daily_Spending_Chart_Wrapper = styled.div`
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