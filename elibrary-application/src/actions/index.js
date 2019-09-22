import { GetBooksURL } from '../constants';

export const GET_BOOKS = 'GET_BOOKS'

export function getBooks(filter, booksData) {
    return {
        type: GET_BOOKS,
        filter: filter,
        booksData: booksData
    };
}

export function fetchData(filter) {
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