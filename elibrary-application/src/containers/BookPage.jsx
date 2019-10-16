import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import moment from 'moment';

import CommentForm from '../components/comments/CommentForm';
import BookInfo from '../components/books/BookInfo';
import BookComments from '../components/books/BookComments';

import CircularProgress from '@material-ui/core/CircularProgress';

import  BookActions  from '../actions/BookActions';
import  CommentActions  from '../actions/CommentActions';
import  ReservationActions  from '../actions/ReservationActions';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "../styles/MainPage.css"

class BookPage extends PureComponent {

    componentWillMount() {
        const id = this.props.match.params.id;
        this.props.getBookComments(id);
        this.props.getCurrentBook(id);
        this.props.getBookReservations(id);
    }

    sendAddCommentRequest(info) {
        let comment = {
            text: info.commentText,
            bookId: this.props.currentBook.bookId,
            userId: this.props.userInfo.userId
        }
        this.props.addComment(comment);
    }

    sendCreateReservationRequest() {
        let reservation = {
            statusId: 1,
            bookId: this.props.currentBook.bookId,
            userId: this.props.userInfo.userId
        }
        this.props.createReservation(reservation);
    }

    sendUpdateReservationRequest(id) {
        let reservation = {
            statusId: 2,
            reservationId: id
        }
        this.props.updateReservation(reservation);
    }

    render() {
        const { isBookLoading, isCommentLoading, isReservationLoading,
            currentBook, currentBookComments, currentBookReservations,
            isAdmin, loggedIn, commentText } = this.props;
        return (
            <Fragment>
                {(() => {
                    if (isBookLoading)
                        return <CircularProgress className="loading" color="secondary" />
                    else
                        return (
                            <Card className="one-book-card">
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {currentBook.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {currentBook.authorName.firstName} {currentBook.authorName.lastName} ({currentBook.year})
                                        </Typography>
                                        {isAdmin &&
                                        <Fragment>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Available copies: {currentBook.freeCopiesCount}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Not available copies: {currentBook.copiesCount - currentBook.freeCopiesCount}
                                            </Typography>
                                        </Fragment>}
                                        {(loggedIn && !isAdmin && currentBook.freeCopiesCount > 0) &&
                                            <Button 
                                                size="small"
                                                onClick={() => this.sendCreateReservationRequest()}
                                            >
                                                Book a book copy
                                            </Button>
                                        }
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                })()}
                {(loggedIn && !isAdmin) &&
                    <div className="commentFields">
                        <CommentForm
                            commentText={commentText}
                            onCommentTextChange={this.props.setCommentText}
                            sendRequest={(data) => this.sendAddCommentRequest(data)}
                        />
                    </div>
                }
                {(() => {
                    if (isReservationLoading && isAdmin)
                    return <CircularProgress className="loading" color="secondary" />
                    else {
                        if (currentBookReservations.length === 0 && isAdmin) {
                            return (
                                <div className="book-area">
                                    <Typography variant="h5" gutterBottom>No reservations.</Typography>
                                </div>
                            )
                        }
                        else {
                            if (isAdmin) {
                                return (
                                    <div className="bookReservations">
                                        <div className="book-area-title">
                                                <Typography variant="h5" gutterBottom>Reservations:</Typography>
                                        </div>
                                        {currentBookReservations.map(reservation =>
                                            <Card key={reservation.reservationId.toString()} className="bookReservation">
                                                <CardContent>
                                                    <Typography className="user" color="textSecondary" gutterBottom>
                                                        {reservation.user.firstName} {reservation.user.lastName}
                                                    </Typography>
                                                    <Typography className="date" color="textSecondary">
                                                        {(() => {
                                                            if (reservation.status.name === "Booked")
                                                                return (
                                                                    <Fragment>                                                              
                                                                        {(() => { let hours = moment().diff(reservation.dateOfReservation, 'hours');
                                                                            return (
                                                                                <Fragment>
                                                                                    Booked: {hours} hours
                                                                                </Fragment> 
                                                                            )
                                                                        })()}
                                                                    </Fragment>                                                                  
                                                                )
                                                            else 
                                                                return (
                                                                    <Fragment>                                                                       
                                                                        {(() => { let days = moment().diff(reservation.dateOfReservation, 'days');
                                                                            return (
                                                                                <Fragment>
                                                                                    Handed Out: {days} days
                                                                                </Fragment> 
                                                                            );
                                                                        })()}
                                                                    </Fragment>
                                                                );
                                                        })()}
                                                    </Typography>
                                                </CardContent> 
                                                {(isAdmin && reservation.status.name === "Booked") &&
                                                    <Fragment>
                                                        <Button 
                                                            size="small"
                                                            color="secondary"
                                                            onClick={() => this.sendUpdateReservationRequest(reservation.reservationId)}
                                                        >
                                                            Give out
                                                        </Button>
                                                        <Button 
                                                            size="small"
                                                            onClick={() => this.props.deleteReservation(reservation.reservationId)}
                                                        >
                                                            Cansel
                                                        </Button>
                                                    </Fragment>
                                                }  
                                                {(isAdmin && reservation.status.name === "Handed out") &&
                                                    <Fragment>
                                                        <Button 
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => this.props.deleteReservation(reservation.reservationId)}
                                                        >
                                                            Delete Reservation
                                                        </Button>
                                                    </Fragment>
                                                }                                          
                                            </Card>
                                        )}
                                    </div>                  
                                );
                            }
                        }
                    }                     
                })()}
                {(() => {
                    if (isCommentLoading)
                    return <CircularProgress className="loading" color="secondary" />
                    else {
                        if (currentBookComments.length === 0) {
                            return (
                                <div className="book-area">
                                    <Typography variant="h5" gutterBottom>No comments.</Typography>
                                </div>  
                            )
                        }
                        else {
                            return (
                                <div className="bookComments">
                                    <div className="book-area-title">
                                        <Typography variant="h5" gutterBottom>Comments:</Typography>
                                     </div>
                                    {currentBookComments.map(comment =>
                                        <Card key={comment.commentId.toString()} className="bookComment">
                                            <CardContent>                                           
                                                    {(() => {
                                                        let date = moment(comment.date).format('MMMM Do YYYY, h:mm:ss a');
                                                        return (
                                                            <Typography className="blockedUser" color="textSecondary" gutterBottom>
                                                                {date} by {comment.user.firstName} {comment.user.lastName}
                                                            </Typography>
                                                        )
                                                    })()}
                                                <Typography className="blockedReason" color="textSecondary">
                                                    {comment.text}
                                                </Typography>
                                            </CardContent>
                                            {isAdmin &&
                                                <CardActions>
                                                    <Button 
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => this.props.deleteComment(comment.commentId)}
                                                    >
                                                        Delete Comment
                                                    </Button>
                                                </CardActions>  
                                            }                                               
                                        </Card>
                                    )}
                                </div>                  
                            );
                        }
                    }                     
                })()}
            </Fragment>  
        )               
    }
}

const mapStateToProps = (state) => {
    return {
        commentText: state.comments.currentComment,
        loggedIn: state.users.loggedIn,
        isAdmin: state.users.isAdmin,
        isBookLoading: state.books.isLoading,
        isCommentLoading: state.comments.isLoading,
        isReservationLoading: state.reservations.isLoading,
        currentBookComments: state.comments.currentBookComments, 
        currentBookReservations: state.reservations.currentBookReservations,
        currentBook: state.books.currentBook,    
        error: state.books.error,
        info: state.books.info,
        userInfo: state.users.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({
        
        addComment: (comment) => {
            return dispatch => {
                dispatch(CommentActions.addComment(comment));
            }
        },

        setCommentText: (commentText) => {
            return (dispatch) => {
                dispatch(CommentActions.setCurrentCommentText(commentText));
                dispatch(change('commentForm', 'commentText', commentText || ''));
            }
        },

        getBookReservations: (bookId) => {
            return dispatch => {
                dispatch(ReservationActions.getListOfReservations(bookId));
            }
        },

        getCurrentBook: (id) => {
            return dispatch => {
                dispatch(BookActions.getBook(id));
            }
        },

        getBookComments: (id) => {
            return dispatch => {
                dispatch(CommentActions.getCommentsByBookId(id));
            }
        },

        createReservation: (reservation) => {
            return dispatch => {
                dispatch(ReservationActions.createReservation(reservation));
            }
        },

        updateReservation: (reservation) => {
            return dispatch => {
                dispatch(ReservationActions.updateReservation(reservation));
            }
        },

        deleteReservation: (id) => {
            return dispatch => {
                dispatch(ReservationActions.deleteReservation(id));
            }
        },

        deleteComment: (id) => {
            return dispatch => {
                dispatch(CommentActions.deleteComment(id));
            }
        },

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps,
    mapDispatchToProps)(BookPage);