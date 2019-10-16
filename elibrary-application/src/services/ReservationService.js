import { settings } from '../config/settings';
import { links } from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class HandedOutReservationService {

    static getListOfReservationsByBookId(bookId) {
        const path = links.RESERVATIONS_BY_BOOK_ID_PATH(bookId);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfReservationsByUserId(userId) {
        const path = links.RESERVATIONS_BY_USER_ID_PATH(userId);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static createReservation(reservation) {
        const path = links.RESERVATIONS_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPostOptions(reservation, token);
        return fetch(settings.baseUrl + path, options);
    }

    static updateReservation(reservation) {
        const path = links.RESERVATIONS_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(reservation, token);
        return fetch(settings.baseUrl + path, options);
    }

    static deleteReservation(id) {
        const path = links.DELETE_RESERVATION_PATH(id);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createDeleteOptions(token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default HandedOutReservationService;