import axios from 'axios';
import baseUrl from './baseUrl';

const fs = window.require('fs');
const state = JSON.parse(fs.readFileSync('src/initialState.json'))

export default axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': state.userState.token
    }
});