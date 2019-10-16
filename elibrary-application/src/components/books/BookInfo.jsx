import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import  BookActions  from '../../actions/BookActions';
import BookComments from '../../components/books/BookComments';

import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class BookInfo extends PureComponent {

    componentWillMount() {
        const id = this.props.bookId;
        this.props.getCurrentBook(id);
    }

    render() {
        const { isLoading, currentBook, isAdmin } = this.props;
        if (isLoading) {
            return (
                <CircularProgress className="loading" color="secondary" />
            )
        }
        else
        {
            return (
                <Fragment>
                    <Card className="book-card">
                        <CardActionArea>
                            <CardMedia
                                className="book-image"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="'{currentBook.title}' by {currentBook.authorName.lastName}"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {currentBook.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {currentBook.authorName.firstName} {currentBook.authorName.lastName}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Fragment>               
            );
            
        }  
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.users.isAdmin,
        isLoading: state.books.isLoading,
        currentBook: state.books.currentBook,    
        error: state.books.error,
        info: state.books.info
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({
        
        getCurrentBook: (id) => {
            return dispatch => {
                dispatch(BookActions.getBook(id));
            }
        },

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps,
    mapDispatchToProps)(BookInfo);