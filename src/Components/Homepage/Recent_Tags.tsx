import React, { useEffect, useState } from 'react';
import { get_popular_tags } from '../../api';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Popular_Tag {
    value: string;
    count: number;
};


export function Recent_Tags() {
    const tags = useSelector((state: RootState) => state.default.tags);

    return (
        <Recent_Tags_Wrapper>
            <Top>
                <Title>Recent Tags</Title>
            </Top>
            <Bot>
                {tags.map(tag => {
                    return (
                        <Tag key={tag.id}>
                            <Tag_Name>{tag.value}</Tag_Name>

                        </Tag>
                    )
                })}
            </Bot>
            
            
        </Recent_Tags_Wrapper>
    )
}

const Recent_Tags_Wrapper = styled.div`
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