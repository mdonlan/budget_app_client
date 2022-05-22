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
import { get_transactions } from '../api';


export function App() {
    const location = useLocation();

    useEffect(async () => {
        await validate_token();
        get_transactions();
    }, [])

    return (
        <Wrapper>
            <Top>
                <Top_Nav location={location}/>
            </Top>
            <Bottom>
                <Switch>
                    <Route exact path="/" component={Homepage} /*exact component={Budget} */ />
                    {/* <Protected_Route exact path="/budget" component={Budget}/> */}
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
    padding: 20px;
`