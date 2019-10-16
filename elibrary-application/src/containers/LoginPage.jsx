import React from 'react';
import { history } from '../store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import LoginForm from '../components/users/LoginForm';
import  UserActions  from '../actions/UserActions';

import "../styles/CreateAuthor.css"


class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.sendSignInRequest = this.sendSignInRequest.bind(this);
    }

    componentDidMount() {
        this.props.getInfo();
    }

    sendSignInRequest(info) {
        let user = {
            login: info.login,
            password: info.password
        }
        this.props.logIn(user);
    }

    render() {
        const { login, password, error } = this.props;
        return(
            <div className="signInContent">
                <div className="formFields">
                    <LoginForm
                        login={login}
                        password={password}
                        onLoginChange={this.props.setLogin}
                        onPasswordChange={this.props.setPassword}
                        sendRequest={(data) => this.sendSignInRequest(data)}
                        onCancelClick={history.goBack}
                    />
                {/* { error && <h2> Wrong username or password! </h2>} */}
            </div>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.users.login,
        password: state.users.password,
        loggedIn: state.users.loggedIn,
        userInfo: state.users.info,
        error: state.users.error,
        isLoading: state.users.isLoading,
        isValid: state.users.isValid,
        redirect: state.users.redirect
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({

        getInfo: () => {
            return dispatch => {
                dispatch(UserActions.getInfo());
            }
        },

        logIn: (user) => {
            return dispatch => {
                dispatch(UserActions.logIn(user));
            }
        },

        setLogin: (login) => {
            return (dispatch) => {
                dispatch(UserActions.setCurrentLogin(login));
                dispatch(change('loginForm', 'login', login || ''));
            }
        },

        setPassword: (password) => {
            return (dispatch) => {
                dispatch(UserActions.setCurrentPassword(password));
                dispatch(change('loginForm', 'password', password || ''));
            }
        }
    }, dispatch);
    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(LoginPage);