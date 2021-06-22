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
    const logged_in = useSelector(state => state.default.logged_in);
    const [transactions, set_transactions] = useState([]);
    const balance = useSelector(state => state.default.balance);
    const dispatch = useDispatch();
    const location = useLocation();
    const [path, set_path] = useState(null);

    useEffect(async () => {
        // const token = localStorage.getItem("token");
        // console.log('before call')
        // const token_is_valid = await validate_token(token);
        // console.log('after call')

        // get_data_from_db();

        validate_token();
    }, [])

    // const RequireAuth = ({ children }) => {
    //     // if (!logged_in) {
    //     //   return <Redirect path="/login" />;
    //     // }
      
    //     return children;
    //   };

    // const Auth_Route = ({ children, ...rest }) => {
    //     return (
    //       <Route
    //         {...rest}
    //         render={({ location }) =>
    //           logged_in ? (
    //             children
    //           ) : (
    //             <Redirect
    //               to={{
    //                 pathname: "/",
    //                 state: { from: location }
    //               }}
    //             />
    //           )
    //         }
    //       />
    //     );
    //   }

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
                <Top_Nav location={location}/>
                <Switch>
                    <Route exact path="/" component={Homepage} /*exact component={Budget} */ />
                    {/* <RequireAuth> */}
                        {/* <Route path="/transactions" component={Transactions} />  */}
                    {/* </RequireAuth> */}
                    <Protected_Route exact path="/accounts" component={Accounts}/> 
                    <Protected_Route exact path="/budget" component={Budget}/>
                    <Route path="/register" component={Register} /> 
                    <Route path="/login" component={Login} /> 
                    <Route path="/homepage" component={Homepage} /> 
                    <Protected_Route exact path="/transactions" component={Transactions}/>
                </Switch>
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
