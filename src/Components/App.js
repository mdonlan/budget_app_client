import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import superagent from 'superagent'
import styled from "styled-components"
import { set_balance } from '../store'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Add_Transaction } from './Add_Transaction'
import { Budget } from './Budget'
import { Register } from './Register'
import { Login } from './Login'
import { Top_Nav } from './Top_Nav'
import { Transactions } from './Transactions'
import { validate_token } from '../api'

export function App() {
    const logged_in = useSelector(state => state.default.logged_in);
    const [transactions, set_transactions] = useState([]);
    const balance = useSelector(state => state.default.balance);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('logged_in: ' + logged_in)
        const token = localStorage.getItem("token");
        if (token) {
            validate_token(token);
        }
        // get_data_from_db();
    }, [])


    // useEffect(() => {
    //     dispatch(set_balance(150));
    //     (async () => {
    //         try {
    //             const response = await superagent.get('http://localhost:3000');
    //             set_transactions(response.body);    
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })();
    // }, [])

    return (
        <Wrapper>
            <Router>
                <Top_Nav />
                <Switch>
                    <Route path="/" exact component={Budget} /> 
                    <Route path="/transactions" component={Transactions} /> 
                    <Route path="/register" component={Register} /> 
                    <Route path="/login" component={Login} /> 
                </Switch>
            </Router>
            {/* <div>
                <div>balance: {balance}</div>
            </div>
            <div>Transactions</div>
            {transactions.map((t, i) => {
                return <div key={i}>{t.name}</div>
            })} */}
        </Wrapper>
    )
}

const Wrapper = styled.div`

`
