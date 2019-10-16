import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import "../../styles/CreateAuthor.css"

const LoginForm = (props) => {
    
    const { login, password,
        onLoginChange, onPasswordChange,
        sendRequest, handleSubmit, onCancelClick } = props;

    return (
        <form className="signInForm" onSubmit={handleSubmit(sendRequest)}>
            <Typography variant="h5" gutterBottom>
                Log In:
            </Typography>
            <Field
                name="login"
                label="Login"
                value={login}
                component={InputField}
                onChange={e => onLoginChange(e.target.value)}
            />
            <Field
                name="password"
                label="Password"
                value={password}
                component={InputField}
                type="password"
                onChange={e => onPasswordChange(e.target.value)}
            />
            <div className="btnBlock">
                <Button
                    type="submit"
                    className="detailsBtn"
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    className="detailsBtn"
                    onClick={onCancelClick}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm)