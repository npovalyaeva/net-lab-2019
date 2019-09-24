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

export function createAuthor(author) {
    const URL = GetAuthorsURL();

    return (dispatch) => {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(author),
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
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