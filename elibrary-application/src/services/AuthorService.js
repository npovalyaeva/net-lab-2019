import { settings } from '../config/settings';
import { links } from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class AuthorService {

    static getListOfAuthors() {
        const path = links.AUTHORS_SEARCH_PAGE;
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static getAuthor(id) {
        const path = links.AUTHOR_REQUEST_PATH(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static createAuthor(authorInfo) {
        const path = links.AUTHORS_SEARCH_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPostOptions(authorInfo, token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default AuthorService;