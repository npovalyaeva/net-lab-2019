import { settings } from '../config/settings';
import { links } from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class HandedOutReservationService {

    static getListOfHandedOutReservations() {
        const path = links.HANDED_OUT_RESERVATIONS_SEARCH_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfHandedOutReservationsByBookTitle(title) {
        const path = links.HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_PATH(title);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfHandedOutReservationsByBookAuthor(name) {
        const path = links.HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_PATH(name);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfHandedOutReservationsByCountOfDays(days) {
        const path = links.HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_PATH(days);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default HandedOutReservationService;