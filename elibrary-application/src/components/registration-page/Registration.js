import React, { PureComponent } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Button, TextField } from '@material-ui/core';

import '../../styles/registration-page/Registration.css';

export class Registration extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',

            formErrors: {email: '', password: '', repeatPassword: ''},
            isEmailValid: false,
            isPasswordValid: false,
            isRepeatPasswordValid: false,
            isFormValid: false
        };

        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let repeatPasswordValid = this.state.repeatPasswordValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            case 'repeatPassword':
                repeatPasswordValid = value = this.state.password;
                fieldValidationErrors.repeatPassword = repeatPasswordValid ? '': ' is not as a password';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            repeatPasswordValid: repeatPasswordValid
        }, this.validateForm);
    }
    validateForm() {
      this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.repeatPasswordValid});
    }

    handleClick(e) {
        this.props.SignUp();
    }

    render() {
        return (
            <form className="registration" noValidate autoComplete="on">
                <ErrorMessage formErrors={this.state.formErrors}/>
                <TextField
                    id="standard-name"
                    label="First Name"
                    className="first-name-input"
                    value={this.state.firstName}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Last Name"
                    className="last-name-input"
                    value={this.state.lastName}
                    margin="normal"
                />
                <TextField
                    id="standard-username-input"
                    label="Username"
                    className="username-input"
                    value={this.state.username}
                    margin="normal"
                />
                <TextField
                    id="standard-email-input"
                    label="Email"
                    className="email"
                    onChange={this.handleUserInput}
                    value={this.state.email}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    className="password"
                    onChange={this.handleUserInput}
                    value={this.state.password}
                    type="password"
                    margin="normal"
                />
                <TextField
                    id="standard-password-input"
                    label="Repeat Password"
                    className="repeatPassword"
                    onChange={this.handleUserInput}
                    value={this.state.passwordRepeat}
                    type="password"
                    margin="normal"
                />
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className="sign-up-button"
                    onClick={this.handleClick}
                    disabled={!this.state.formValid}>
                    Sign Up
                </Button>
            </form>
        )
    };
}