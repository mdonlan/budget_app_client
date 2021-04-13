import superagent from 'superagent'

export function register_user(data) {
    console.log(data)
    // return axios({
    //     method: "POST",
    //     url: 'http://localhost:3000/register_user',
    //     data: data
    // })
    // .then(res => {
    //     // console.log(res);
    //     localStorage.setItem("token", res.data.token);
    //     return res.data.message;
    // })
    // .catch(e => {
    //     // console.log(e);
    //     console.log(e.response);
    //     return e.response.data;
    // })
    superagent.post('http://localhost:3000/register_user')
    .send(data)
    .then(res => {
        console.log(res);
        localStorage.setItem("token", res.body.token);
        return res.body.message;
    })
}