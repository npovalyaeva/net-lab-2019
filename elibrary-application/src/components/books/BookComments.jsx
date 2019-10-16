import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import  CommentActions  from '../../actions/CommentActions';

import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class BookComments extends PureComponent {

    componentWillMount() {
        const id = this.props.bookId;
        this.props.getBookComments(id);
    }

    render() {
        const { isLoading, currentBookComments, isAdmin } = this.props;
        if (isLoading) {
            return (
                <CircularProgress className="loading" color="secondary" />
            )
        }
        else
        {
            if (currentBookComments.length === 0) {
                return (
                    <p>No comments.</p>
                )
            }
            else {
                return (
                    <div className="bookComments">
                        {currentBookComments.map(comment =>
                            <Card key={comment.commentId.toString()} className="bookComment">
                                <CardContent>
                                    <Typography className="blockedUser" color="textSecondary" gutterBottom>
                                        {comment.date}
                                    </Typography>
                                    <Typography className="blockedReason" color="textSecondary">
                                        {comment.text}
                                    </Typography>
                                </CardContent>
                                {isAdmin &&
                                    <CardActions>
                                        <Button 
                                            size="small"
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
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.users.isAdmin,
        isLoading: state.comments.isLoading,
        currentBookComments: state.comments.currentBookComments,   
        error: state.comments.error,
        info: state.comments.info
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({
        
        getBookComments: (id) => {
            return dispatch => {
                dispatch(CommentActions.getCommentsByBookId(id));
            }
        },

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps,
    mapDispatchToProps)(BookComments);