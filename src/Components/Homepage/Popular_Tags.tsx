import React, { useEffect, useState } from 'react';
import { get_transaction_numbers_data } from '../../api';
import styled from 'styled-components';

export function Popular_Tags() {
    // const [month, set_month] = useState<number>(0);
    // const [week, set_week] = useState<number>(0);
    // const [day, set_day] = useState<number>(0);

    useEffect(() => {
        async function get_data() {
            // const data = await get_transaction_numbers_data();
            // // console.log(data)
            // set_month(data.num_month_transactions);
            // set_week(data.num_week_transactions);
            // set_day(data.num_day_transactions);
        }
        
        get_data();
    }, []);

    return (
        <Popular_Tags_Wrapper>
            <Top>
                <Title>Popular Tags</Title>
            </Top>
            <Bot>
                {/* <Column>
                    <Name>Day</Name>
                    <Value>{day}</Value>
                </Column>
                <Column>
                    <Name>Week</Name>
                    <Value>{week}</Value>
                </Column>
                <Column>
                    <Name>Month</Name>
                    <Value>{month}</Value>
                </Column> */}
            </Bot>
            
            
        </Popular_Tags_Wrapper>
    )
}

const Popular_Tags_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 50px;
    background: rgba(255, 255, 255, 0.09);
    width: 400px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 3px;
`

const Title = styled.div`
    color: #b5b5b5;
    margin-bottom: 30px;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    color: #b5b5b5;
    margin-bottom: 20px;
`

const Bot = styled.div`
    display: flex;
    // justify-content: space-around;
    color: #dddddd;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    padding-left: 5px;
    padding-right: 5px;
`

const Name = styled.div`
    color: #b5b5b5;
    margin-bottom: 10px;
`
const Value = styled.div`
    font-size: 30px;
`