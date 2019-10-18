import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';
import "../../styles/CreateAuthor.css"

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const SignUpForm = (props) => {
    const { email, username, firstName, lastName, password, passwordConfirmation,
        emailError, usernameError, firstNameError, lastNameError, passwordError, passwordConfirmationError,
        onEmailChange, onUsernameChange, onFirstNameChange, onLastNameChange, onPasswordChange, onPasswordConfirmationChange,
        sendRequest, handleSubmit, onCancelClick } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)} className="signUpForm">
            <Typography variant="h5" gutterBottom>
                Sign Up:
            </Typography>
            <Field
                name="email"
                label="Email"
                value={email}
                component={InputField}
                error={emailError}
                onChange={e => onEmailChange(e.target.value)}
            />
            <Field
                name="username"
                label="Username"
                value={username}
                component={InputField}
                error={usernameError}
                onChange={e => onUsernameChange(e.target.value)}
            />
            <Field
                name="firstName"
                label="First Name"
                value={firstName}
                component={InputField}
                error={firstNameError}
                onChange={e => onFirstNameChange(e.target.value)}
            />
            <Field
                name="lastName"
                label="Last Name"
                value={lastName}
                component={InputField}
                error={lastNameError}
                onChange={e => onLastNameChange(e.target.value)}
            />
            <Field
                name="password"
                label="Password"
                value={password}
                component={InputField}
                type="password"
                error={passwordError}
                onChange={e => onPasswordChange(e.target.value)}
            />
            <Field
                name="confirmPassword"
                label="Confirm Password"
                value={passwordConfirmation}
                component={InputField}
                type="password"
                error={passwordConfirmationError}
                onChange={e => onPasswordConfirmationChange(e.target.value)}
            />
            <div className="btnBlock">
                <Button 
                    type="submit"
                    className="detailsBtn notActive">
                        Submit
                </Button>
                <Button 
                    type="button" 
                    onClick={onCancelClick} 
                    className="detailsBtn detailsBtnNotActive">
                        Cancel
                </Button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'SignUpForm'
})(SignUpForm)