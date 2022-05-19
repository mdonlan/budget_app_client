import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import superagent from 'superagent'
import styled from "styled-components"
import { set_balance } from '../store'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, Redirect } from "react-router-dom";
import { Add_Transaction } from './Add_Transaction'
import { Budget } from './Budget'
import { Register } from './Register'
import { Login } from './Login'
import { Top_Nav } from './Top_Nav'
import { Transactions } from './Transactions'
import { Accounts } from './Accounts'
import { login, validate_token } from '../api'
import { Homepage } from './Homepage'
import { Protected_Route } from './Protected_Route'



export function App() {
    const location = useLocation();

    useEffect(async () => {
        validate_token();
    }, [])

    return (
        <Wrapper>
            <Top>
                <Top_Nav location={location}/>
            </Top>
            <Bottom>
                <Switch>
                    <Route exact path="/" component={Homepage} /*exact component={Budget} */ />
                    <Protected_Route exact path="/accounts" component={Accounts}/> 
                    <Protected_Route exact path="/budget" component={Budget}/>
                    <Route path="/register" component={Register} /> 
                    <Route path="/login" component={Login} /> 
                    <Route path="/homepage" component={Homepage} /> 
                    <Protected_Route exact path="/transactions" component={Transactions}/>
                </Switch>
            </Bottom>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Top = styled.div`
    
`
const Bottom = styled.div`
    height: calc(100% - 70px);
`