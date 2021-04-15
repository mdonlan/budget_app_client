import superagent from 'superagent'
import { store, set_logged_in, set_token, set_categories } from './store'

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

export function validate_token(token) {
    console.log("validate_token");
    console.log(token)
    return superagent.post('http://localhost:3000/validate_token')
    .send({ token: token })
    .then(res => {
        console.log(res);
        if (res.body.valid_token) {
            store.dispatch(set_logged_in(true));
            store.dispatch(set_token(token));
            // store.dispatch(set_username(res.data.username));
        }
    })
    .catch(e => {
        console.log(e);
    })
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
        store.dispatch(set_token(token));
        history.push("/");
        return res.body.message;
    })
    .catch(e => {
        console.log(e)
        return e.message;
    })
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