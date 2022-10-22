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
import { format, parse, parseISO } from 'date-fns';

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
    {key: "daily_spending_chart", x: 0, y: 6, w: 3, h: 5, component: Daily_Spending_Chart},
    {key: "weekly_spending_chart", x: 3, y: 6, w: 3, h: 5, component: Weekly_Spending_Chart},
    {key: "spending_by_tag_chart", x: 6, y: 6, w: 3, h: 6, component: Spending_By_Tag_Chart},
    {key: "spending_by_transaction_chart", x: 9, y: 6, w: 3, h: 6, component: Spending_By_Transaction_Chart},
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

    const active_month = useSelector(state => state.default.active_month);

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
        <Homepage_Wrapper>
            <Top>
                <Active_Month>{format(parseISO(active_month), "MMMM yyyy")}</Active_Month>
                <Active_Month_Btn>&lt;</Active_Month_Btn>
                <Active_Month_Btn>&gt;</Active_Month_Btn>
            </Top>
            <ReactGridLayout
                layout={layout}
                onLayoutChange={onLayoutChange}
                margin={[20, 20]}
                {...defaultProps}
                // {...this.props}
                >
                {generateDOM()}
            </ReactGridLayout>
        </Homepage_Wrapper>
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

const Homepage_Wrapper = styled.div``

const Layout_Item = styled.div`
    background: #222222;
`
const Active_Month = styled.div`
    margin-right: 20px;
    font-size: 24px;
    // font-variant: small-caps;
`

const Top = styled.div`
    display: flex;
    margin-left: 30px;
`

const Active_Month_Btn = styled.div`
    line-height; 24px;
    display: flex;
    align-items: center;
    margin-left: 3px;
    marign-right: 3px;
    cursor: pointer;
`