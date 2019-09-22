import { combineReducers } from 'redux';
import { authorsData } from './authorsData';
import { booksData } from './booksData';

export default combineReducers({
    authorsData,
    booksData
})