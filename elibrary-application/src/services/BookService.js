import { settings } from '../config/settings';
import { links } from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class BookService {

    static getListOfBooks() {
        const path = links.BOOKS_SEARCH_PAGE;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfFreeBooks() {
        const path = links.FREE_BOOKS_PATH;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfBooksByTitle(title) {
        const path = links.BOOKS_BY_TITLE_PATH(title);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfBooksByAuthor(name) {
        const path = links.BOOKS_BY_AUTHOR_PATH(name);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfBooksByYear(year) {
        const path = links.BOOKS_BY_YEAR_PATH(year);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getBook(id) {
        const path = links.BOOK_REQUEST_PATH(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static createBook(bookInfo) {
        const path = links.BOOKS_SEARCH_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPostOptions(bookInfo, token);
        return fetch(settings.baseUrl + path, options);
    }

    static getBooksByFilter(filterType, filterInfo) {

    }
}

export default BookService;