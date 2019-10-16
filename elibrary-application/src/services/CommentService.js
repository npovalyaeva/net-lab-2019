import { settings } from '../config/settings';
import { links } from '../config/links';
import RequestOptions from '../constants/RequestOptions';

class CommentService {

    static addComment(comment) {
        const path = links.COMMENTS_PAGE;
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPostOptions(comment, token);
        return fetch(settings.baseUrl + path, options);
    }

    static getListOfCommentsByBookId(id) {
        const path = links.COMMENTS_PATH(id);
        const options = RequestOptions.createGetOptions();
        return fetch(settings.baseUrl + path, options);
    }

    static deleteComment(id) {
        const path = links.COMMENT_PATH(id);
        const token = localStorage.getItem('token');
        const options = RequestOptions.createPutOptions(null, token);
        return fetch(settings.baseUrl + path, options);
    }
}

export default CommentService;