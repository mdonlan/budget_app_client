import superagent from 'superagent'
import { store, set_logged_in, set_token, set_transactions, set_tags } from './store'
import history from './history'
import { Time_Period } from './Types'

let host = null;

if (window.location.href.includes("localhost")) {
    host = 'http://localhost:3001';
} else {
    host = "https://budgetserver.michaeldonlan.com";
}

export async function register_user(data) {
    return superagent.post(`${host}/register_user`)
    .send(data)
    .then(res => {
        console.log(res)
        if (res.body.token) {
            localStorage.setItem("token", res.body.token);
            store.dispatch(set_token(res.body.token));
            store.dispatch(set_logged_in(true));
            // history.push("/");
            return { success: true, message: res.body.message};
        } else {
            return { success: false, message: res.body.message };
        }
    })
}

export async function validate_token() {
    console.log("attemping to validate token...");
    const token = localStorage.getItem("token");
    const response = await superagent.post(`${host}/validate_token`).send({ token: token });
    if (response.body.valid_token) {
        console.log('token is valid');
        store.dispatch(set_logged_in(true));
        store.dispatch(set_token(token));
        // return true;
    } else {
        console.log('token is NOT valid')
        store.dispatch(set_logged_in(false));
        // store.dispatch(set_token(token));
        // return false;
    }
}

export function login(data) {
    return superagent.post(`${host}/login`)
    .send({ username: data.username, password: data.password })
    .then(res => {
        localStorage.setItem("token", res.body.token);
        store.dispatch(set_token(res.body.token));
        store.dispatch(set_logged_in(true));
        return { success: true, message: res.body.message};
    })
    .catch(e => {
        console.log(e)
        return { success: false, message: e.message};
    })
}

export function logout() {
    localStorage.removeItem("token");
    store.dispatch(set_token(null));
    store.dispatch(set_logged_in(false));
    history.push("/");
}

export function create_transaction(transaction) {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    transaction.date = transaction.date.toUTCString();
    
    superagent.post(`${host}/create_transaction`)
    .send({transaction: transaction, token: token})
    .then(() => {
        // console.log('completed post')
        console.log('creating new transaction');
        console.log(transaction);
        get_transactions();
    })
}

export function get_transactions() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_transactions`)
    .send({token: token})
    .then(res => {
        store.dispatch(set_transactions(res.body.transactions));
    })   
}

export function delete_transaction(transaction) {
    const token = localStorage.getItem("token");
    if (!token) return;
    superagent.post(`${host}/delete_transaction`)
    .send({transaction_id: transaction.id, token: token})
    .then(res => {
        // console.log('completed post')
        get_transactions();
    })
}

export function get_month_data() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_month_data`)
    .send({ token: token })
    .then(res => {
        // console.log(res.body);
        return res.body;
    })
    .catch(e => console.log(e))
}

export function get_week_data() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_week_data`)
    .send({ token: token })
    .then(res => {
        // console.log(res.body);
        return res.body;
    })
    .catch(e => console.log(e))
}

export function get_day_data() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_day_data`)
    .send({ token: token })
    .then(res => {
        // console.log(res.body);
        return res.body;
    })
    .catch(e => console.log(e))
}

export function get_transaction_numbers_data() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_transaction_numbers_data`)
    .send({ token: token })
    .then(res => {
        // console.log(res.body)
        return res.body;
    })
    .catch(e => console.log(e))
}

export function get_tags() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_tags`)
    .send({ token: token })
    .then(res => {
        // console.log(res.body)
        store.dispatch(set_tags(res.body.tags));
    })
    .catch(e => console.log(e))
}

export function get_popular_tags() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_popular_tags`)
    .send({ token: token })
    .then(res => {
        return res.body;
    })
    .catch(e => console.log(e))
}

export function get_amount_spent_by_tags() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_amount_spent_by_tags`)
    .send({ token: token })
    .then(res => {
        console.log('get_amount_spend_by_tags call return')
        return res.body;
    })
    .catch(e => console.log(e))
}

export function get_time_period_data(time_period: Time_Period) {
    const token = localStorage.getItem("token");
    if (!token) return;
    return superagent.post(`${host}/get_time_period_data`)
    .send({ token: token, time_period: time_period })
    .then(res => {
        console.log(res.body)
        return res.body;
    })
    .catch(e => console.log(e))
}
