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
// import { Responsive, WidthProvider } from "react-grid-layout";
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
// import "../../sty"
import "react-grid-layout/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

const defaultProps = {
    className: "layout",
    // items: 20,
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 12
};

const items = [
    {key: "expenses", x: 0, y: 0, w: 3, h: 3, component: Expenses},
    {key: "num_transactions", x: 3, y: 0, w: 3, h: 3, component: Num_Transactions},
    {key: "popular_tags", x: 6, y: 0, w: 3, h: 5, component: Popular_Tags},
    {key: "recent_transactions", x: 9, y: 0, w: 3, h: 4, component: Recent_Transactions},
    {key: "spending_by_tag", x: 0, y: 3, w: 3, h: 4, component: Spending_By_Tag},
    {key: "daily_spending_chart", x: 0, y: 6, w: 3, h: 4, component: Daily_Spending_Chart},
    {key: "weekly_spending_chart", x: 3, y: 6, w: 3, h: 4, component: Weekly_Spending_Chart},
    {key: "spending_by_tag_chart", x: 6, y: 6, w: 3, h: 6, component: Spending_By_Tag_Chart},
    {key: "spending_by_transaction_chart", x: 0, y: 9, w: 3, h: 6, component: Spending_By_Transaction_Chart},
];

 {/*   <Homepage_Item area={"2 / 3 / 3 / 3"}>
    //                     <Recent_Transactions />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"2 / 4 / 3 / 5"}>
    //                     <Spending_By_Tag />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"4 / 3 / 5 / 5"}>
    //                     <Daily_Spending_Chart />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"4 / 1 / 5 / 3"}>
    //                     <Weekly_Spending_Chart />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"2 / 1 / 4 / 3"}>
    //                     <Spending_By_Tag_Chart />
    //                 </Homepage_Item> 
    //                 <Homepage_Item area={"5 / 2 / 6 / 4"}>
    //                     <Spending_By_Transaction_Chart />
    //                 </Homepage_Item>  */}
    //                  </ResponsiveReactGridLayout>

export function Homepage() {
    // const logged_in = useSelector(state => state.default.logged_in);
    const [layout, set_layout] = useState([]);
    //     {i: "expenses", x: 0, y: 0, w: 4, h: 1},
    //     {i: "num_transactions", x: 5, y: 0, w: 4, h: 1},
    //     {i: "popular_tags", x: 0, y: 4, w: 4, h: 1}
    // ]);

    useEffect(() => {
        // set_layout(gen_layout());
        const layout = generateLayout();
        console.log(layout)
        set_layout(layout);
    }, [])

    function get_component(name) {
        const item = items.find(el => el.key == name);
        return <item.component />;
    }
    
    function generateDOM() {
        console.log(items)
        return layout.map((item, i) => {
            return (
                <Layout_Item key={item.i}>
                
                {items[i].component != null &&
                    get_component(item.i)
                }
                {!items[i].component &&
                    <span className="text">{i}</span>
                }
              </Layout_Item>
            );
        })
    }
    
    function generateLayout() { 
        // const p = defaultProps;
        // const items = new Array(defaultProps.items);
        const new_layout = [];
        for (let i = 0; i < items.length; i++) {
            const y = Math.ceil(Math.random() * 4) + 1;
            const item = {
                x: items[i].x,
                y: items[i].y,
                w: items[i].w,
                h: items[i].h,
                i: items[i].key
            };
            new_layout.push(item);
        }
        return new_layout;
    }
    
    function onLayoutChange(layout) {
        set_layout(layout)
    }
    
    
    return (
        <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...defaultProps}
        // {...this.props}
        >
        {generateDOM()}
        </ReactGridLayout>
    );
    
    

    // return (
    //     <Homepage_Wrapper>
    //         {!logged_in &&
    //             <div>please log in</div>
    //         }
    //         {logged_in &&
    //             <>
    //                 <ResponsiveReactGridLayout
    //                   className="layout"
    //                   layout={layout}
    //                 //   cols={12}
    //                 //   style={{minHeight: '900px'}}
    //                 //   rowHeight={30}
    //                 //   width={1200}
    //                 >
    //                    {/* <div key="a">a</div>
    //                     <div key="b">b</div>
    //                     <div key="c">c</div> */}
    //                     {/* {this.generateDOM()} */}
                   
    //                <Homepage_Item key="expenses">
    //                     <Expenses />
    //                 </Homepage_Item>
    //                 <Homepage_Item key="num_transactions">
    //                     <Num_Transactions />
    //                 </Homepage_Item>
    //                 <Homepage_Item key="popular_tags">
    //                     <Popular_Tags />
    //                 </Homepage_Item>
    //                {/*   <Homepage_Item area={"2 / 3 / 3 / 3"}>
    //                     <Recent_Transactions />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"2 / 4 / 3 / 5"}>
    //                     <Spending_By_Tag />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"4 / 3 / 5 / 5"}>
    //                     <Daily_Spending_Chart />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"4 / 1 / 5 / 3"}>
    //                     <Weekly_Spending_Chart />
    //                 </Homepage_Item>
    //                 <Homepage_Item area={"2 / 1 / 4 / 3"}>
    //                     <Spending_By_Tag_Chart />
    //                 </Homepage_Item> 
    //                 <Homepage_Item area={"5 / 2 / 6 / 4"}>
    //                     <Spending_By_Transaction_Chart />
    //                 </Homepage_Item>  */}
    //                  </ResponsiveReactGridLayout>
    //             </>
    //         }   
    //     </Homepage_Wrapper>
    // )
}

const Homepage_Wrapper = styled.div`
    // display: flex;
    // flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(4, 1fr);
    // // grid-template-rows: repeat(5, 275px);
    // grid-auto-rows: minmax(100px, auto);
    // grid-column-gap: 0px;
    // grid-row-gap: 0px; 
    width: 100%;
    min-height: 100%;
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
    // grid-area: ${props => props.area};
    // .div1 { grid-area: 2 / 2 / 3 / 3; } 
    // min-width: 0;
    // min-height: 0;
`

const Layout_Item = styled.div`
    background: rgba(55, 158, 222, 0.2);
`