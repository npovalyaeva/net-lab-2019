import React, { PureComponent } from 'react';
import { history } from '../../store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import  BlockedUserActions  from '../../actions/BlockedUserActions';
import "../../styles/MainPage.css"


class BlockedUsersPage extends PureComponent {

    componentWillMount() {
        this.props.getBlockedUsers();
    }

    render() {
        const { isLoading, blockedUsers } = this.props;
        if (isLoading) {
            return (
                <CircularProgress className="loading" color="secondary" />
            )
        }
        else
        {
            if (blockedUsers.length === 0) {
                return (
                    <div className="no-blocked-users">
                        <Typography variant="h5" gutterBottom>No blocked users.</Typography>
                    </div>         
                )
            }
            else {
                return (
                    <div className="blockedUsers">
                        <div className="blocked-title">
                            <Typography variant="h5" gutterBottom>Blocked users</Typography>
                        </div>
                        {blockedUsers.map(blockedUser =>
                            <Card key={blockedUser.userId.toString()} className="blockedUser">
                                <CardContent>
                                    <Typography className="blockedUser" variant="h6" color="textSecondary" gutterBottom>
                                        User: {blockedUser.username}
                                    </Typography>
                                    <Typography className="blockedReason" color="textSecondary">
                                        Blocked Reason: {blockedUser.blockedReason}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small"
                                        onClick={() => this.props.unblockUser(blockedUser.userId)}
                                    >
                                        Unblock
                                    </Button>
                                </CardActions>
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
        isLoading: state.blockedUsers.isLoading,
        blockedUsers: state.blockedUsers.blockedUsers,     
        error: state.blockedUsers.error,
        info: state.blockedUsers.info
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({
        
        getBlockedUsers: () => {
            return dispatch => {
                dispatch(BlockedUserActions.getBlockedUsers());
            }
        },

        unblockUser: (id) => {
            return dispatch => {
                dispatch(BlockedUserActions.unblockUser(id));
            }
        },

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(BlockedUsersPage);