import React, { useEffect, useState } from 'react';
import { get_amount_spent_by_tags } from '../../api';
import styled from 'styled-components';
import { Time_Period } from '../../Types';

// interface Popular_Tag {
//     value: string;
//     count: number;
// };

interface Spending_Tag {
    name: string;
    amount: number;
};

export function Spending_By_Tag(props: {time_period: Time_Period}) {
    const [spending_tags, set_spending_tags] = useState<Spending_Tag[]>([]);

    useEffect(() => {
        async function get_data() {
            // const data = await get_amount_spent_by_tags(props.time_period, date);
            // // console.log(data.spending_tags);
            // set_spending_tags(data.spending_tags);
        }
        
        get_data();
    }, []);

    return (
        <Spending_By_Tag_Wrapper>
            <Top>
                <Title>Spending By Tag</Title>
            </Top>
            <Bot>
                {spending_tags.map((tag: Spending_Tag, i: number) => {
                    return (
                        <Tag key={i}>
                            <Tag_Name>{tag.name}</Tag_Name>
                            <Tag_Count>{tag.amount}</Tag_Count>
                        </Tag>
                    )
                })}
            </Bot>
            
            
        </Spending_By_Tag_Wrapper>
    )
}

const Spending_By_Tag_Wrapper = styled.div`
 
`

const Title = styled.div`
    color: #dddddd;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 24px;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    color: #b5b5b5;
    margin-bottom: 20px;
`

const Bot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #dddddd;
`

const Tag = styled.div`
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin-top: 3px;
    padding: 5px;
    font-size: 18px;
`

const Tag_Name = styled.div`
    width: 50%;
    text-align: right;
    margin-right: 8px;
`

const Tag_Count = styled.div`
    width: 50%;
    text-align: left;
    margin-left: 8px;
`