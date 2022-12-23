import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { get_transactions_by_time_period } from '../../api';
import { hsla_to_str, random_hsla } from './Spending_By_Tag_Chart'
import { Time_Period } from '../../Types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);
// Chart.register(ChartDataLabels);

const plugin = {
    id: "test_plugin",
    afterDraw: function(chart) {
        if (chart.data.datasets.length === 1 && chart.data.datasets[0].data.length == 0) {
            // No data is present
          var ctx = chart.ctx;
          var width = chart.width;
          var height = chart.height
          chart.clear();
            
          ctx.save();
          ctx.textAlign = 'center';
        //   ctx.textBaseline = 'middle';
          ctx.font = "24px 'Arial'";
          ctx.fillText('Add some transactions to view', width / 2, height / 2);
          ctx.restore();
        }
    }
}

export function Spending_By_Transaction_Chart(props: {time_period: Time_Period}) {
    const [chart_data, set_chart_data] = useState<any>({
        labels: [],
        datasets: [],
    });

    const [options, set_options] = useState<ChartOptions>({
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#dddddd',
                // align: 'end',
                // anchor: 'end',
                formatter: function(value, context) {
                    const data = context.chart.data.datasets[0].data;
                    const total = data.reduce((total: number, i: number) => {return total + i}, 0) as number;
                    // show transaction name if value is > 8% of total, prevents overlapping labels
                    if (value / total > 0.08) {
                        return context.chart.data.labels[context.dataIndex];
                    } else {
                        return null;
                    }
                }
            }
        }
    });
   
    useEffect(() => {
        async function get_data() {
            const data = await get_transactions_by_time_period(props.time_period);
            const transactions = data.transactions;
            
            const background_colors = transactions.map((t, i) => random_hsla());
            const border_colors = background_colors.map(color => {
                const new_color = {...color};
                new_color.a = 1;
                return new_color;
            })
            
            const new_chart_data: ChartData = {
                labels: transactions.map(t => t.name),
                datasets: [
                    {
                        label: "Spending By Tag",
                        data: transactions.map(t => !t.is_inflow ? t.value : 0),
                        backgroundColor: background_colors.map(color => hsla_to_str(color)),
                        borderColor: border_colors.map(color => hsla_to_str(color)),
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)',
                        // ],
                        // borderColor: [
                        //     'rgba(255, 99, 132, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(255, 206, 86, 1)',
                        //     'rgba(75, 192, 192, 1)',
                        //     'rgba(153, 102, 255, 1)',
                        //     'rgba(255, 159, 64, 1)',
                        // ]
                    }
                ],
            }
        
            set_chart_data(new_chart_data);        
       }

       get_data();
    }, [props.time_period]);

    return (
        <Spending_By_Transaction_Chart_Wrapper>
            <Title>Spending By Transaction</Title>
            <Chart>
                <Pie plugins={[plugin, ChartDataLabels]} width={null} height={null} options={options} data={chart_data} />
            </Chart>
        </Spending_By_Transaction_Chart_Wrapper>
    )
}

const Spending_By_Transaction_Chart_Wrapper = styled.div`
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

const Title = styled.div`
    font-size: 24px;
    margin-bottom: 12px;
`