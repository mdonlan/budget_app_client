import React, {useEffect} from 'react'
import styled from "styled-components"
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, Redirect } from "react-router-dom";
import { Register } from './Register'
import { Login } from './Login'
import { Top_Nav } from './Top_Nav'
import { Transactions } from './Transactions'
import { validate_token } from '../api'
import { Homepage } from './Homepage/Homepage'
import { Protected_Route } from './Protected_Route'
import { get_transactions, get_tags } from '../api';
import { Tags } from './Tags';
import { Left_Nav } from './Left_Nav'
import { Add_Transaction } from './Add_Transaction';


export function App() {
    const location = useLocation();

    useEffect(async () => {
        await validate_token();
        get_transactions();
        get_tags();
    }, [])

    return (
        <Wrapper>
            <Left>
                <Left_Nav location={location}/>
            </Left>
            <Right>
                <Top>
                    {/* <Top_Nav location={location}/> */}
                </Top>
                <Bottom>
                    <Switch>
                        <Route exact path="/" component={Homepage} /*exact component={Budget} */ />
                        {/* <Protected_Route exact path="/budget" component={Budget}/> */}
                        <Route path="/register" component={Register} /> 
                        <Route path="/login" component={Login} /> 
                        <Route path="/homepage" component={Homepage} /> 
                        <Protected_Route exact path="/transactions" component={Transactions}/>
                        <Protected_Route exact path="/tags" component={Tags}/>
                        <Protected_Route exact path="/add_transaction" component={Add_Transaction}/>
                    </Switch>
                </Bottom>
            </Right>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`

const Left = styled.div`
    height: 100%;
    width: 250px;
`

const Right = styled.div`
    width: 100%;
`

const Top = styled.div`
    
`
const Bottom = styled.div`
    height: calc(100% - 70px);
    padding: 20px;
`