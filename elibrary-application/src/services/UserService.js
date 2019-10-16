import { settings } from '../config/settings';
import { links } from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class UserService {
    static logIn(info) {
        const path = links.USER_SIGN_IN_PAGE;
        const options = RequestOptions.createPostOptions(info);
        return fetch(settings.baseUrl + path, options);
    }

    static getProfile() {
        const path = links.USER_PROFILE_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static getBlockedUsers() {
        const path = links.BLOCKED_USERS_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createGetOptions(token);
        return fetch(settings.baseUrl + path, options);
    }

    static signUp(info) {
        const path = links.USERS_PAGE;
        const options = RequestOptions.createPostOptions(info);
        return fetch(settings.baseUrl + path, options);
    }

    static blockUser(info) {
        const path = links.BLOCK_USER_PATH;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(info, token);
        return fetch(settings.baseUrl + path, options);
    }

    static unblockUser(id) {
        const path = links.UNBLOCK_USER_PATH(id);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(null, token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default UserService;