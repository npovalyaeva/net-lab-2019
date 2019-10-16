import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';
import "../../styles/CreateAuthor.css"

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const SignUpField = (props) => {
    const { sendRequest, handleSubmit, onCancelClick } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)} className="signUpForm">
            <Typography variant="h5" gutterBottom>
                Sign Up:
            </Typography>
            <Field
                name="email"
                label="Email"
                component={InputField}
            />
            <Field
                name="username"
                label="Username"
                component={InputField}
            />
            <Field
                name="firstName"
                label="First Name"
                component={InputField}
            />
            <Field
                name="lastName"
                label="Last Name"
                component={InputField}
            />
            <Field
                name="password"
                label="Password"
                component={InputField}
                type="password"
            />
            <Field
                name="confirmPassword"
                label="Confirm Password"
                component={InputField}
                type="password"
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
})(SignUpField)