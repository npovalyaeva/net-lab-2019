export const links = {
    BOOKS_PAGE: '/books',
    
    USERS_PAGE: '/users',
    COMMENTS_PAGE: '/comments',
    RESERVATIONS_PAGE: '/reservations',

    BLOCK_USER_PAGE: "/users/block",
    FREE_BOOKS_PATH: '/books/free',
    BOOKS_BY_TITLE_PATH: (title) => `/books/title/${title}`,
    BOOKS_BY_AUTHOR_PATH: (authorName) => `/books/author/${authorName}`,
    BOOKS_BY_YEAR_PATH: (year) => `/books/year/${year}`,

    MAIN_PAGE_PATH: '/',
    USER_SIGN_IN_PAGE: '/users/login',
    USER_PROFILE_PAGE: '/users/profile',

    PROFILE_PAGE: '/account/profile',
    
    ABOUT_INFO_PAGE: '/about',
    BOOK_REQUEST_PATH: (id) => `/books/${id}`,
    HANDED_OUT_BOOKS_PAGE: '/books/handedout',
    BOOKS_SEARCH_PAGE: '/books',
    AUTHORS_SEARCH_PAGE: '/authors',
    AUTHOR_REQUEST_PATH: (id) => `/authors/${id}`,
    CREATE_AUTHOR_PAGE: '/authors/new',
    CREATE_BOOK_PAGE: '/books/new',
    BLOCKED_USERS_PAGE: '/users/blocked',
    BLOCK_USER_PATH: '/users/block',
    UNBLOCK_USER_PATH: (userId) => `/users/unblock/${userId}`,
    COMMENT_PATH: (commentId) => `/comments/${commentId}`,
    RESERVATIONS_BY_BOOK_ID_PATH: (bookId) => `/reservations/book/${bookId}`,
    RESERVATIONS_BY_USER_ID_PATH: (userId) => `/reservations/user/${userId}`,
    DELETE_RESERVATION_PATH: (id) => `/reservations/${id}`,

    HANDED_OUT_RESERVATIONS_SEARCH_PAGE: '/reservations/handedout',
    HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_PATH: (title) => `/reservations/handedout/title/${title}`,
    HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_PATH: (authorName) => `/reservations/handedout/author/${authorName}`,
    HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_PATH: (days) => `/reservations/handedout/days/${days}`,

    BOOK_INFO_PAGE: (id) => `/books/${id}/info`,
    BOOK_PAGE: '/books/:id/info',
    USER_PAGE: '/profile/:id',

    
    COMMENTS_PATH: (id) => `/comments/book/${id}`,

    SIGN_UP_PAGE: '/account/signup',
    SIGN_OUT_PAGE: '/account/signout',
    SIGN_IN_PAGE: '/account/login',
    USER_PAGE: '/account',
}