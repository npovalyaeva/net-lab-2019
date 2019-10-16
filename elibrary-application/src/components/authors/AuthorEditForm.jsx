import React from 'react';
import { reduxForm, Field } from 'redux-form';

import Button from '@material-ui/core/Button';
import InputField from '../InputField';
import Typography from '@material-ui/core/Typography';

import "../../styles/CreateAuthor.css"


const AuthorEditForm = (props) => {

    const { handleSubmit, sendRequest, onCancelClick, 
        lastName, firstName, patronymic,
        onLastNameChange, onFirstNameChange, onPatronymicChange } = props;    
    
    return (
        <form className="authorEditForm" onSubmit={handleSubmit(sendRequest)}>
            <Typography variant="h5" gutterBottom>
                Add Author
            </Typography>
            <Field
                name="lastName"
                label="Last Name"
                component={InputField}
                onChange={e => onLastNameChange(e.target.value)}
                value={lastName}
            />
            <Field
                name="firstName"
                label="First Name"
                component={InputField}
                onChange={e => onFirstNameChange(e.target.value)}
                value={firstName}
            />
            <Field
                name="patronymic"
                label="Patronymic"
                component={InputField}
                onChange={e => onPatronymicChange(e.target.value)}
                value={patronymic}
            />
                <Button
                    className="bookBtn"
                    type="submit">
                    OK
                </Button>
                <Button
                    className="bookBtn"
                    type="button"
                    onClick={onCancelClick}
                >
                    Cancel
                </Button>
        </form>
    );  
}

export default reduxForm({
    form: 'authorEditForm'
})(AuthorEditForm)
