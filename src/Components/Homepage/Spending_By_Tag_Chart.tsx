import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { get_amount_spent_by_tags } from '../../api';
import { Time_Period } from '../../Types';
// import { startOfMonth, addWeeks, getWeekOfMonth, format, endOfMonth } from 'date-fns';


ChartJS.register(ArcElement, Tooltip, Legend);

// ChartJS.register({
//     id: "test_plugin",
//     afterDraw: function(chart) {
        
//         if (chart.data.datasets.length === 0) {
//             console.log("datasets");
//             console.log(chart.data.datasets)
//         //     // No data is present
//         //   var ctx = chart.ctx;
//         //   var width = chart.width;
//         //   var height = chart.height
//         //   chart.clear();
          
//         //   ctx.save();
//         //   ctx.textAlign = 'center';
//         //   ctx.textBaseline = 'middle';
//         //   ctx.font = "16px normal 'Helvetica Nueue'";
//         //   ctx.fillText('No data to display', width / 2, height / 2);
//         //   ctx.restore();
//         }
//     }
// });

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
    // console.log('hlsa: ', hsla)
    const str = `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
    // console.log(str)
    return str;
}

export function Spending_By_Tag_Chart(props: {time_period: Time_Period}) {

    const [chart_data, set_chart_data] = useState<any>({
        labels: [],
        datasets: []
    });
    const [options, set_options] = useState<ChartOptions>({
        maintainAspectRatio: false,
        responsive: true,
    });
    // const chart_ref = useRef(null);
   
    useEffect(() => {
       async function get_data() {
            const data = await get_amount_spent_by_tags(props.time_period);
            console.log("amount spent by tags")
            console.log(data);
            const tags = data.spending_tags;
            
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
                ]
            }
        
            set_chart_data(new_chart_data);        
       }

       get_data();
    }, [props.time_period]);

    return (
        <Spending_By_Tag_Chart_Wrapper>
            <Title>Spending By Tag</Title>
            <Chart>
                <Pie plugins={[plugin]} width={null} height={null} options={options} data={chart_data} />
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
`