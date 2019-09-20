import React, { PureComponent } from 'react';
import { Button, TextField } from '@material-ui/core';

import '../../styles/registration-page/Registration.css';

export class Authorisation extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',

            formErrors: {email: '', password: '', repeatPassword: ''},
            isFirstNameValid: false,
            isLastNameValid: false,
            isUsernameValid: false,
            isEmailValid: false,
            isPasswordValid: false,
            isRepeatPasswordValid: false,
            isFormValid: false
        };

        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        let firstNameValid = this.state.isFirstNameValid;
        let lastNameValid = this.state.isLastNameValid;
        let usernameValid = this.state.isUsernameValid;
        let emailValid = this.state.isEmailValid;
        let passwordValid = this.state.isPasswordValid;
        let repeatPasswordValid = this.state.isRepeatPasswordValid;

        switch(fieldName) {
            case 'firstName':
                firstNameValid = value.length >= 1;
                break;
            case 'lastName':
                lastNameValid = value.length >= 1;
                break;
            case 'username':
                usernameValid = value.length >= 1;
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
                break;
            case 'passwordRepeat':
                repeatPasswordValid = value === this.state.password;
                fieldValidationErrors.repeatPassword = repeatPasswordValid ? '': 'This password does not match that entered in the password field';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            isFirstNameValid: firstNameValid,
            isLastNameValid: lastNameValid,
            isUsernameValid: usernameValid,
            isEmailValid: emailValid,
            isPasswordValid: passwordValid,
            isRepeatPasswordValid: repeatPasswordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({isFormValid: this.state.isFirstNameValid && this.state.isLastNameValid && this.state.isUsernameValid 
            && this.state.isEmailValid && this.state.isPasswordValid && this.state.isRepeatPasswordValid});
    }

    handleClick(e) {
        this.props.SignUp();
    }

    render() {
        return (
            <form className="registration" noValidate autoComplete="on">
                <TextField
                    label="Login"
                    className="email-input"
                    value={this.state.login}
                    name="login"
                    autoComplete="email"
                    margin="normal"
                    // TODO: Add error property
                />
                <TextField
                    label="Password"
                    className="password-input"
                    value={this.state.password}
                    type="password"
                    name="password"
                    margin="normal"
                />
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className="sign-in-button"
                    onClick={this.handleClick}
                    disabled={!this.state.formValid}>
                    Sign In
                </Button>
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className="sign-up-button"
                    onClick={this.handleClick}>
                    Sign Up
                </Button>
            </form>
        )
    };
}