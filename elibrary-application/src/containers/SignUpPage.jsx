import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../store/store';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import SignUpForm from '../components/users/SignUpForm';
import { links } from '../config/links';
import  UserCreationActions  from '../actions/UserCreationActions';

import "../styles/CreateAuthor.css"


class SignUpPage extends PureComponent {
    constructor(props) {
        super(props);
        this.sendSignUpRequest = this.sendSignUpRequest.bind(this);
    }

    sendSignUpRequest(info) {
        let user = {
            email: info.email,
            password: info.password,
            username: info.username,
            firstName: info.firstName,
            lastName: info.lastName,
        }
        this.props.signUp(user);
    }

    render() {
        const { email, username, firstName, lastName, password, passwordConfirmation,
            emailError, usernameError, firstNameError, lastNameError, passwordError, passwordConfirmationError,
            error, redirect } = this.props;
        return(
            <div className="signUpContent">
                {
                    !(redirect)?
                    <div>
                        <SignUpForm
                            email={email}
                            emailError={emailError}
                            onEmailChange={this.props.setEmail}

                            username={username}
                            usernameError={usernameError}
                            onUsernameChange={this.props.setUsername}

                            firstName={firstName}
                            firstNameError={firstNameError}
                            onFirstNameChange={this.props.setFirstName}

                            lastName={lastName}
                            lastNameError={lastNameError}
                            onLastNameChange={this.props.setLastName}

                            password={password}
                            passwordError={passwordError}
                            onPasswordChange={this.props.setPassword}
                            
                            passwordConfirmation={passwordConfirmation}               
                            passwordConfirmationError={passwordConfirmationError}
                            onPasswordConfirmationChange={this.props.setPasswordConfirmation}

                            sendRequest={(data) => this.sendSignUpRequest(data)}
                            onCancelClick={history.goBack}
                        />
                        { error && <h2>Failed to sign up, try again?</h2>}
                    </div>
                    : <Redirect to={links.PROFILE_PAGE}/>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.info,
        error: state.users.error,
        isLoading: state.users.isLoading,
        isValid: state.users.isValid,
        redirect: state.users.redirect,

        email: state.userCreation.email,
        username: state.userCreation.username,
        firstName: state.userCreation.firstName,
        lastName: state.userCreation.lastName,
        password: state.userCreation.password,
        passwordConfirmation: state.userCreation.passwordConfirmation,

        emailError: state.userCreation.emailError,
        usernameError: state.userCreation.usernameError,
        firstNameError: state.userCreation.firstNameError,
        lastNameError: state.userCreation.lastNameError,
        passwordError: state.userCreation.passwordError,
        passwordConfirmationError: state.userCreation.passwordConfirmationError
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({

        signUp: (user) => {
            return dispatch => {
                dispatch(UserCreationActions.signUp(user));
            }
        },

        setEmail: (email) => {
            return (dispatch) => {
                dispatch(UserCreationActions.setCurrentEmail(email));
                dispatch(change('SignUpForm', 'email', email || ''));
            }
        },

        setUsername: (username) => {
            return (dispatch) => {
                dispatch(UserCreationActions.setCurrentUsername(username));
                dispatch(change('SignUpForm', 'username', username || ''));
            }
        },

        setFirstName: (firstName) => {
            return (dispatch) => {
                dispatch(UserCreationActions.setCurrentFirstName(firstName));
                dispatch(change('SignUpForm', 'firstName', firstName || ''));
            }
        },

        setLastName: (lastName) => {
            return (dispatch) => {
                dispatch(UserCreationActions.setCurrentLastName(lastName));
                dispatch(change('SignUpForm', 'lastName', lastName || ''));
            }
        },

        setPassword: (password) => {
            return (dispatch) => {
                dispatch(UserCreationActions.setCurrentPassword(password));
                dispatch(change('SignUpForm', 'password', password || ''));
            }
        },

        setPasswordConfirmation: (passwordConfirmation) => {
            return (dispatch) => {
                dispatch(UserCreationActions.setCurrentPasswordConfirmation(passwordConfirmation));
                dispatch(change('SignUpForm', 'passwordConfirmation', passwordConfirmation || ''));
            }
        }

    }, dispatch);
    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(SignUpPage);