import React, { PureComponent } from 'react';
import { Button, TextField } from '@material-ui/core';

import '../../styles/registration-page/Registration.css';

export class Authorisation extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            formErrors: {email: '', password: ''},
            isEmailValid: false,
        };

        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            {[name]: value}
        );
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
                    onClick={this.handleClick}>
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