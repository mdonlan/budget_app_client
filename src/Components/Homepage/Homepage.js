import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Expenses } from './Expenses';
import { Num_Transactions } from './Num_Transactions';
import { Popular_Tags } from './Popular_Tags';
import { Recent_Transactions } from './Recent_Transactions';
import { Spending_By_Tag } from './Spending_By_Tag';
import { Daily_Spending_Chart } from './Daily_Spending_Chart';
import { Weekly_Spending_Chart } from './Weekly_Spending_Chart';
import { Spending_By_Tag_Chart } from './Spending_By_Tag_Chart';
import { Spending_By_Transaction_Chart} from './Spending_By_Transaction_Chart'
import { useSelector } from 'react-redux';
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export function Homepage() {
    const logged_in = useSelector(state => state.default.logged_in);
    const [layout, set_layout] = useState([
        {i: "a", x: 0, y: 0, w: 2, h: 2},
        {i: "b", x: 0, y: 2, w: 2, h: 2},
        {i: "c", x: 2, y: 2, w: 1, h: 1}
    ]);

    useEffect(() => {
        // set_layout(gen_layout());
    }, [])

    // function gen_layout() {
        // const p = this.props;

        // return .map(function(item, i) {
        //   const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
        //   return {
        //     x: (i * 2) % 12,
        //     y: Math.floor(i / 6) * y,
        //     w: 2,
        //     h: y,
        //     i: i.toString()
        //   };
    //     });
    //   }

    return (
        <Homepage_Wrapper>
            {!logged_in &&
                <div>please log in</div>
            }
            {logged_in &&
                <>
                    <ReactGridLayout
                      className="layout"
                      layout={layout}
                      cols={12}
                      rowHeight={30}
                      width={1200}
                    >
                       <div key="a">a</div>
                        <div key="b">b</div>
                        <div key="c">c</div>
                        {/* {this.generateDOM()} */}
                    </ReactGridLayout>
                    {/* <Homepage_Item area={"1 / 1 / 2 / 3"}>
                        <Expenses />
                    </Homepage_Item>
                    <Homepage_Item area={"1 / 3 / 2 / 5"}>
                        <Num_Transactions />
                    </Homepage_Item>
                    <Homepage_Item area={"5 / 1 / 6 / 2"}>
                        <Popular_Tags />
                    </Homepage_Item>
                    <Homepage_Item area={"2 / 3 / 3 / 3"}>
                        <Recent_Transactions />
                    </Homepage_Item>
                    <Homepage_Item area={"2 / 4 / 3 / 5"}>
                        <Spending_By_Tag />
                    </Homepage_Item>
                    <Homepage_Item area={"4 / 3 / 5 / 5"}>
                        <Daily_Spending_Chart />
                    </Homepage_Item>
                    <Homepage_Item area={"4 / 1 / 5 / 3"}>
                        <Weekly_Spending_Chart />
                    </Homepage_Item>
                    <Homepage_Item area={"2 / 1 / 4 / 3"}>
                        <Spending_By_Tag_Chart />
                    </Homepage_Item> 
                    <Homepage_Item area={"5 / 2 / 6 / 4"}>
                        <Spending_By_Transaction_Chart />
                    </Homepage_Item>  */}
                </>
            }   
        </Homepage_Wrapper>
    )
}

const Homepage_Wrapper = styled.div`
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    // grid-template-rows: repeat(5, 275px);
    grid-auto-rows: minmax(100px, auto);
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
`

const Homepage_Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 50px;
    background: rgba(255, 255, 255, 0.09);
    // width: 375px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 3px;
    margin: 25px;
    // grid-column-start: ${props => props.col_start};
    // grid-column-end: ${props => props.col_end};
    grid-area: ${props => props.area};
    // .div1 { grid-area: 2 / 2 / 3 / 3; } 
    // min-width: 0;
    // min-height: 0;
`