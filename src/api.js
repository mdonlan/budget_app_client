import superagent from 'superagent'

export function register_user(data) {
    return superagent.post('http://localhost:3000/register_user')
    .send(data)
    .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.body.token);
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
            // store.dispatch(set_logged_in(true));
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
    .send({ data: data })
    .then(res => {
        console.log(res);
        console.log('logged in')
        localStorage.setItem("token", res.body.token);
        history.push("/");
        return res.body.message;
    })
    .catch(e => {
        console.log(e)
        return e.message;
    })
}