import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  UserActions  from '../actions/UserActions';
import  ReservationActions  from '../actions/ReservationActions';
import moment from 'moment';


import { Link } from 'react-router-dom';
import { links } from '../config/links';

import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import "../styles/MainPage.css"


class ProfilePage extends PureComponent {

    componentWillMount() {
        this.props.getProfile();
        this.props.getUserReservations(this.props.userInfo.userId);
    }

    componentDidMount() {
        this.props.reset();
    }

    render() {
        const { userInfo, isAdmin, loggedIn, isReservationLoading, currentUserReservations } = this.props;
        return(
            <div className="profile">
                {userInfo &&
                    <div className="welcome">
                        <Typography variant="h4" gutterBottom>
                            Welcome, {userInfo.firstName} {userInfo.lastName} ({userInfo.username})
                        </Typography>
                        {(loggedIn && !isAdmin && userInfo.isBlocked) &&
                            <div className="blockingMessage">
                            <Typography variant="h6" gutterBottom>Status: Blocked</Typography>
                            <Typography variant="h6" gutterBottom>Blocked Reason: {userInfo.blockedReason}</Typography>
                            </div>
                        }
                    </div>
                }
                {(loggedIn && !isAdmin && !userInfo.isBlocked) &&
                    <Fragment>
                        {(() => {
                            if (isReservationLoading)
                                return <CircularProgress className="loading" color="secondary" />
                            else {
                                if (currentUserReservations.length === 0) {
                                    return (
                                        <div className="no-blocked-users">
                                            <Typography variant="h5" gutterBottom>No reservations.</Typography>
                                        </div>  
                                    )
                                }
                                else {
                                    return (
                                        <div className="blockedUsers">
                                            <div className="blocked-title">
                                                <Typography variant="h5" gutterBottom>Reservations</Typography>
                                            </div>
                                            {currentUserReservations.map(reservation =>
                                                <Card key={reservation.reservationId.toString()} className="bookReservation">
                                                    <CardContent>
                                                        <Typography className="user" color="textSecondary" gutterBottom>
                                                            "{reservation.book.title}"
                                                        </Typography>
                                                        <Typography className="status" color="textSecondary" gutterBottom>
                                                            {reservation.status.name}
                                                        </Typography>
                                                        {(() => {
                                                            let date = moment(reservation.dateOfReservation).format('MMMM Do YYYY, h:mm:ss a');
                                                            return (
                                                                <Typography className="blockedUser" color="textSecondary" gutterBottom>
                                                                    {date}
                                                                </Typography>
                                                            )
                                                        })()}
                                                    </CardContent>                            
                                                </Card>
                                            )}
                                        </div>                  
                                    );                   
                                }
                            }                     
                        })()}
                    </Fragment>
                }
                {isAdmin &&
                <div className="buttons">
                    <Link to={ links.CREATE_AUTHOR_PAGE } >
                        <Button>
                        Add Author
                        </Button>
                    </Link>
                    <Link to={ links.CREATE_BOOK_PAGE } >
                        <Button>
                        Add Book
                        </Button>
                        
                    </Link>
                    <Link to={ links.BLOCKED_USERS_PAGE } >
                        <Button>
                            Blocked Users
                        </Button>
                    </Link>
                    <Link to={ links.HANDED_OUT_BOOKS_PAGE } >
                        <Button>
                            Handed out Books
                        </Button>
                    </Link>
                    <Link to={ links.BLOCK_USER_PAGE } >
                        <Button color="secondary">
                            Block User
                        </Button>
                    </Link>
                </div>                 
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.userInfo,
        isAdmin: state.users.isAdmin,
        error: state.users.error,
        isLoading: state.users.isLoading,
        isValid: state.users.isValid,
        isReservationLoading: state.reservations.isLoading,
        currentUserReservations: state.reservations.currentUserReservations,
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        
        reset: () => {
            return dispatch => {
                dispatch(UserActions.reset());
            }
        },

        getUserReservations: (userId) => {
            return dispatch => {
                dispatch(ReservationActions.getListOfUserReservations(userId));
            }
        },

    }, dispatch);

    return {
        ...bindedCreators,
        getProfile: () => dispatch(UserActions.getProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);