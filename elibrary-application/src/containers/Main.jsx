import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

import { history } from '../store/store';

import CircularProgress from '@material-ui/core/CircularProgress';

import ProtectedRoute from '../components/ProtectedRoute';
import SignUpPage from './SignUpPage';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import UserPage from './admin/UserPage';
import BooksPage from './BooksPage';
import BookPage from './BookPage';
import BlockedUsersPage from './admin/BlockedUsersPage';
import BlockUserPage from './admin/BlockUserPage';
import HandedOutReservationsPage from './admin/HandedOutReservationsPage';
import CreateAuthorPage from './admin/CreateAuthorPage';
import CreateBookPage from './admin/CreateBookPage';

import { links } from '../config/links';
import UserActions from '../actions/UserActions';

import Layout from '../components/Layout';
import AboutPage from './AboutPage';

class Main extends PureComponent {

    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        const { isLoading, loggedIn, isAdmin } = this.props;
        return (
            <Layout
                loggedIn={loggedIn}
                isAdmin={isAdmin}
                onSignOut={this.props.signOut}
            >
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-center"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick
                />
                {isLoading ?
                    <CircularProgress className="loading" color="primary" />
                :
                <Router history={history}>
                    <Switch>
                        <Route exact path={ links.MAIN_PAGE_PATH } component={ MainPage }/>
                        <Route exact path={ links.BOOKS_PAGE } component={ BooksPage }/>
                        <Route exact path={ links.BOOK_PAGE } component={ BookPage }/>
                        <Route exact path={ links.USER_PAGE } component={ UserPage }/>
                        <Route exact path={ links.SIGN_IN_PAGE  } component={ LoginPage }/>
                        <Route exact path={ links.SIGN_UP_PAGE } component={ SignUpPage }/>
                        <Route exact path={ links.ABOUT_INFO_PAGE } component={ AboutPage }/>
                        <ProtectedRoute
                            exact path={ links.PROFILE_PAGE }
                            component={ ProfilePage }
                            isPermitted={ loggedIn }
                            redirectTo={ links.SIGN_IN_PAGE }
                        />
                        <ProtectedRoute
                            exact path={ links.HANDED_OUT_BOOKS_PAGE }
                            component={ HandedOutReservationsPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.MAIN_PAGE_PATH }
                        />
                        <ProtectedRoute
                            exact path={ links.BLOCK_USER_PAGE }
                            component={ BlockUserPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.MAIN_PAGE_PATH }
                        />
                        <ProtectedRoute
                            exact path={ links.CREATE_AUTHOR_PAGE }
                            component={ CreateAuthorPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.MAIN_PAGE_PATH }
                        />
                        <ProtectedRoute
                            exact path={ links.CREATE_BOOK_PAGE }
                            component={ CreateBookPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.MAIN_PAGE_PATH }
                        />
                        <ProtectedRoute
                            exact path={ links.BLOCKED_USERS_PAGE }
                            component={ BlockedUsersPage }
                            isPermitted={ isAdmin }
                            redirectTo={ links.MAIN_PAGE_PATH }
                        />
                    </Switch>
                </Router>
                }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        isAdmin: state.users.isAdmin,
        userInfo: state.users.info,
        error: state.users.error,
        isSent: state.users.isSent,
        isValid: state.users.isValid,
        isLoading: state.users.isLoading,
        signedUp: state.users.signedUp
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signOut: () => UserActions.signOut(),
        getProfile: () => UserActions.getProfile()
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);