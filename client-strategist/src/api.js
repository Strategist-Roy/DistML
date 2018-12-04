import axios from 'axios';
import baseUrl from './baseUrl';

const fs = window.require('fs');
const state = JSON.parse(fs.readFileSync('src/initialState.json'))

let headers;

if ('userState' in state)
    headers = {
        'Authorization': state.userState.token
    }

export default axios.create({
    baseURL: baseUrl,
    headers: headers
});