import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { get_month_data } from '../../api';

ChartJS.register(ArcElement, Tooltip, Legend);

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
          ctx.fillText('No data to display', width / 2, height / 2);
          ctx.restore();
        }
    }
}

export function Spending_By_Transaction_Chart() {
    const [chart_data, set_chart_data] = useState<any>({
        labels: [],
        datasets: [],
    });
    const [options, set_options] = useState<ChartOptions>({
        maintainAspectRatio: false,
        // plugins: {
        //     legend: {
        //         display: false
        //     }
        // }
        // responsive: false,
    });
    // const chart_ref = useRef(null);
   
    useEffect(() => {
       async function get_data() {
            const data = await get_month_data();
            console.log("data for Spending_By_Transaction component")
            console.log(data);
            const transactions = data.transactions;
            
            
            const new_chart_data: ChartData = {
                labels: transactions.map(t => t.name),
                datasets: [
                    {
                        label: "Spending By Tag",
                        data: transactions.map(t => t.value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ]
                    }
                ],
            }
        
            set_chart_data(new_chart_data);        
       }

       get_data();
    }, []);

    return (
        <Spending_By_Transaction_Chart_Wrapper>
            <Title>Spending By Transaction</Title>
            <Chart>
                <Pie plugins={[plugin]} width={null} height={null} options={options} data={chart_data} />
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
`