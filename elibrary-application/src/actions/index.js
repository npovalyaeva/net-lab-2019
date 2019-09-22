import { GetAuthorsURL } from '../constants';
import { GetBooksURL } from '../constants';

export const GET_AUTHORS = 'GET_AUTHORS'
export const GET_BOOKS = 'GET_BOOKS'

export function getAuthors(authorsData) {
    return {
        type: GET_AUTHORS,
        authorsData: authorsData
    };
}

export function getBooks(filter, booksData) {
    return {
        type: GET_BOOKS,
        filter: filter,
        booksData: booksData
    };
}

export function fetchAuthors() {
    const URL = GetAuthorsURL();

    return (dispatch) => {
        fetch(URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            dispatch(getAuthors(json));
        })
        .catch((error) => console.log(error));
    };
}

export function fetchBooks(filter) {
    const URL = GetBooksURL(filter);

    return (dispatch) => {
        fetch(URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            dispatch(getBooks(filter, json));
        })
        .catch((error) => console.log(error));
    };
}