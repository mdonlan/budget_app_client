import React, { useEffect, useState } from 'react';
import { get_popular_tags } from '../../api';
import styled from 'styled-components';

interface Popular_Tag {
    value: string;
    count: number;
};


export function Popular_Tags() {
    // const [month, set_month] = useState<number>(0);
    // const [week, set_week] = useState<number>(0);
    // const [day, set_day] = useState<number>(0);
    const [popular_tags, set_popular_tags] = useState<Popular_Tag[]>([]);

    useEffect(() => {
        async function get_data() {
            const data = await get_popular_tags();
            // console.log(data.popular_tags);
            set_popular_tags(data.popular_tags.slice(0, 5));
        }
        
        get_data();
    }, []);

    return (
        <Popular_Tags_Wrapper>
            <Top>
                <Title>Popular Tags</Title>
            </Top>
            <Bot>
                {popular_tags.map((tag: Popular_Tag, i: number) => {
                    return (
                        <Tag key={i}>
                            <Tag_Name>{tag.value}</Tag_Name>
                            <Tag_Count>{tag.count}</Tag_Count>
                        </Tag>
                    )
                })}
            </Bot>
            
            
        </Popular_Tags_Wrapper>
    )
}

const Popular_Tags_Wrapper = styled.div`
    // display: flex;
    // flex-direction: column;
    // padding: 20px;
    // padding-bottom: 50px;
    // background: rgba(255, 255, 255, 0.09);
    // width: 400px;
    // margin-left: 10px;
    // margin-right: 10px;
    // border-radius: 3px;
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
    // margin-top: 3px;
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