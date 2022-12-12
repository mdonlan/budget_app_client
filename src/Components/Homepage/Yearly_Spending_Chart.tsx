import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData, DatasetController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { get_week_data, get_year_data } from '../../api';
import { startOfWeek, nextDay, isSameDay, toDate, startOfDay, format, subDays, getMonth, isSameMonth } from 'date-fns';
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

interface Month {
    name: string;
    amount: number;
    month_index: number;
};

const starting_chart_data: ChartData = {
	labels: [],
	datasets: []
};

export function Yearly_Spending_Chart() {
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

	useEffect(() => {
		async function get_data() {
			const data = await get_year_data();
			const transactions: Transaction[] = data.transactions;

            const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const months: Month[] = [];

            for (let i = 0; i < month_names.length; i++) {
                const month: Month = {
                    name: month_names[i],
                    month_index: i,
                    amount: 0
                };
                months.push(month);
            }

            console.log(months)

			transactions.forEach((t: Transaction) => {
                // console.log(t)
				const month_index = getMonth(new Date(t.date));
                console.log(month_index)
                months[month_index].amount += t.value;
			});

			const new_chart_data: ChartData = {
				labels: months.map(m => m.name),
				datasets: [
					{
						data: months.map(m => m.amount),
						borderColor: "rgba(84, 48, 217, 1)",
						borderWidth: 1,
						backgroundColor: "rgba(84, 48, 217, 0.2)",
						fill: true
					}
				]
			}

			set_chart_data(new_chart_data);
			chart_ref.current.update();
		}

		get_data();
	}, []);

	return (
		<Daily_Spending_Chart_Wrapper>
			<Chart_Title>Spending This Year</Chart_Title>
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