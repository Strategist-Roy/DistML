import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

//load from localstorage data
const initialState = (localStorage["redux-store"]) ? JSON.parse(localStorage["redux-store"]) : {};

export default applyMiddleware(thunk)(createStore)(allReducers, initialState);