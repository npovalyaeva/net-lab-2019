import { combineReducers } from 'redux';
import { userReducer } from '../reducers/userReducer';
import { blockedUserReducer } from '../reducers/blockedUserReducer';
import { authorReducer } from '../reducers/authorReducer';
import { bookReducer } from '../reducers/bookReducer';
import { userCreationReducer } from '../reducers/userCreationReducer';
import { handedOutReservationReducer } from '../reducers/handedOutReservationReducer';
import { reservationReducer } from '../reducers/reservationReducer';
import { commentReducer } from '../reducers/commentReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default (history) => combineReducers({
    form: reduxFormReducer,
    books: bookReducer,
    comments: commentReducer,
    handedOutReservations: handedOutReservationReducer,
    reservations: reservationReducer,
    authors: authorReducer,
    blockedUsers: blockedUserReducer,
    users: userReducer,
    userCreation: userCreationReducer,
    toastr: toastrReducer,
    router: connectRouter(history)
});