import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { get_amount_spent_by_tags } from '../../api';
import { Time_Period } from '../../Types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const plugin = {
    id: "test_plugin",
    afterDraw: function(chart) {
        if (chart.data.datasets.length === 1 && chart.data.datasets[0].data.length == 0) {
          var ctx = chart.ctx;
          var width = chart.width;
          var height = chart.height
          chart.clear();
            
          ctx.save();
          ctx.textAlign = 'center';
        //   ctx.textBaseline = 'middle';
          ctx.font = "24px 'Arial'";
          ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
          ctx.fillText('Add some tags to view', width / 2, height / 2);
          ctx.restore();
        }
    }
}

export function random_hsla() {
    //https://stackoverflow.com/questions/1484506/random-color-generator
    // return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 0.4)';
    return {
        h: Math.random() * 360,
        s: 100,
        l: 50,
        a: 0.2
    }
}

export function hsla_to_str(hsla) {
    return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
}

export function Spending_By_Tag_Chart(props: {time_period: Time_Period, date: Date}) {
    const [chart_data, set_chart_data] = useState<any>({
        labels: [],
        datasets: []
    });

    const [options, set_options] = useState<ChartOptions>({
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#dddddd',
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
            const data = await get_amount_spent_by_tags(props.time_period, props.date);
            const tags = data.spending_tags;
            console.log(tags)
            
            const background_colors = tags.map((t, i) => random_hsla());
            const border_colors = background_colors.map(color => {
                const new_color = {...color};
                new_color.a = 1;
                return new_color;
            })

            const new_chart_data: ChartData = {
                labels: tags.map(t => t.name),
                datasets: [
                    {
                        label: "Spending By Tag",
                        data: tags.map(t => t.amount),
                        backgroundColor: background_colors.map(color => hsla_to_str(color)),
                        borderColor: border_colors.map(color => hsla_to_str(color)),
                    }
                ]
            }
        
            set_chart_data(new_chart_data);        
       }

       get_data();
    }, [props.time_period, props.date]);

    return (
        <Spending_By_Tag_Chart_Wrapper>
            <Title>Spending By Tag</Title>
            <Chart>
                <Pie plugins={[plugin, ChartDataLabels]} width={null} height={null} options={options} data={chart_data} />
            </Chart>
        </Spending_By_Tag_Chart_Wrapper>
    )
}

const Spending_By_Tag_Chart_Wrapper = styled.div`
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