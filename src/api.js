import superagent from 'superagent'
import { 
    store, 
    set_logged_in, 
    set_token, 
    set_categories, 
    set_transactions,
    set_accounts
} from './store'

export function register_user(data) {
    return superagent.post('http://localhost:3000/register_user')
    .send(data)
    .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.body.token);
        store.dispatch(set_token(token));
        return res.body.message;
    })
}

export async function validate_token() {
    console.log("attemping to validate token...");
    const token = localStorage.getItem("token");
    const response = await superagent.post('http://localhost:3000/validate_token').send({ token: token });
    if (response.body.valid_token) {
        console.log('token is valid');
        // store.dispatch(set_logged_in(true));
        // store.dispatch(set_token(token));
        return true;
    } else {
        console.log('token is NOT valid')
        return false;
    }


    // return await superagent.post('http://localhost:3000/validate_token')
    // .send({ token: token })
    // .then(res => {
    //     if (res.body.valid_token) {
    //         console.log('token is valid')
    //         store.dispatch(set_logged_in(true));
    //         store.dispatch(set_token(token));
    //         return true;
    //         // store.dispatch(set_username(res.data.username));
    //     }
    //     else {
    //         console.log('token is not valid');
    //         return false;
    //     }
    // })
    // .catch(e => {
    //     console.log(e);
    // })
}

export function login(data, history) {
    console.log('login');
    console.log(data);

    return superagent.post('http://localhost:3000/login')
    .send({ username: data.username, password: data.password })
    .then(res => {
        console.log(res);
        console.log('logged in')
        localStorage.setItem("token", res.body.token);
        store.dispatch(set_token(res.body.token));
        store.dispatch(set_logged_in(true));
        history.push("/");
        return res.body.message;
    })
    .catch(e => {
        console.log(e)
        return e.message;
    })
}

export function logout(history) {
    console.log('logout')
    localStorage.removeItem("token");
    store.dispatch(set_token(null));
    store.dispatch(set_logged_in(false));
    history.push("/");
}

export function create_category(category, token) {
    superagent.post('http://localhost:3000/create_category')
    .send({category: category, token: token})
    .then(res => {

    })
}

export function get_categories() {
    // const state = store.getState().default;
    // const token = state.token;
    // console.log(token)
    const token = localStorage.getItem("token");
    return superagent.post('http://localhost:3000/get_categories')
    .send({token: token})
    .then(res => {
        console.log(res);
        store.dispatch(set_categories(res.body.categories));
    })   
}

export function create_transaction(transaction) {
    const token = localStorage.getItem("token");
    superagent.post('http://localhost:3000/create_transaction')
    .send({transaction: transaction, token: token})
    .then(() => {
        // console.log('completed post')
    })
}

export function get_transactions() {
    const token = localStorage.getItem("token");
    return superagent.post('http://localhost:3000/get_transactions')
    .send({token: token})
    .then(res => {
        store.dispatch(set_transactions(res.body.transactions));
    })   
}

export function get_accounts() {
    const token = localStorage.getItem("token");
    return superagent.post('http://localhost:3000/get_accounts')
    .send({token: token})
    .then(res => {
        store.dispatch(set_accounts(res.body.accounts));
    })   
}

// refers to a budget account, not user account
export function create_account(account) {
    const token = localStorage.getItem("token");
    superagent.post('http://localhost:3000/create_account')
    .send({account: account, token: token})
    .then(() => {
        // console.log('completed post')
    })
}

export function delete_category(category) {
    const token = localStorage.getItem("token");
    superagent.post('http://localhost:3000/delete_category')
    .send({category: category, token: token})
    .then(() => {
        // console.log('completed post')
    })
}

export function delete_transaction(transaction) {
    const token = localStorage.getItem("token");
    superagent.post('http://localhost:3000/delete_transaction')
    .send({transaction: transaction, token: token})
    .then(() => {
        // console.log('completed post')
    })
}