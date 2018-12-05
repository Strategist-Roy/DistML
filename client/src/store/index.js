import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import multi from 'redux-multi';

//load initialState file
const fs = window.require('fs')
const initialState = JSON.parse(fs.readFileSync('src/initialState.json'));

export default applyMiddleware(thunk, multi)(createStore)(allReducers, initialState);