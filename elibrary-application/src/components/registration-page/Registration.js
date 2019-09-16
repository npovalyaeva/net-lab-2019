import React, { PureComponent } from 'react';
import { Button, TextField } from '@material-ui/core';

import '../../styles/registration-page/Registration.css';

export class Registration extends PureComponent {
    render() {
        return (
            <form className="registration" noValidate autoComplete="on">
                <TextField
                    id="standard-name"
                    label="First Name"
                    className="first-name-input"
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Last Name"
                    className="last-name-input"
                    margin="normal"
                />
                <TextField
                    id="standard-email-input"
                    label="Username"
                    className="username-input"
                    margin="normal"
                />
                <TextField
                    id="standard-email-input"
                    label="Email"
                    className="email-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                />
                <TextField
                  id="standard-password-input"
                  label="Password"
                  className="password-input"
                  type="password"
                  margin="normal"
                />
                <TextField
                  id="standard-password-input"
                  label="Repeat Password"
                  className="repeat-password-input"
                  type="password"
                  margin="normal"
                />
                <Button variant="contained" color="primary" className="sign-up-button">
                    Sign Up
                </Button>
            </form>
        )
    };
}