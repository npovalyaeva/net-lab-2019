import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';
import "../../styles/CreateAuthor.css"

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const BlockUserForm = (props) => {
    const { sendRequest, handleSubmit, onCancelClick } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)} className="signUpForm">
            <Typography variant="h5" gutterBottom>
                Block User:
            </Typography>
            <Field
                name="userId"
                label="User Id"
                value="number"
                component={InputField}
            />
            <Field
                name="blockingReason"
                label="Blocking Reason"
                value="text"
                component={InputField}
            />
            <div className="btnBlock">
                <Button 
                    type="submit"
                    className="detailsBtn notActive">
                        Block
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
    form: 'BlockUserForm'
})(BlockUserForm)