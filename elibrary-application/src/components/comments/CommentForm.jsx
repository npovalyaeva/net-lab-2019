import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CommentForm = (props) => {
    
    const { commentText, onCommentTextChange,
        sendRequest, handleSubmit } = props;

    return (
        <form className="commentForm" onSubmit={handleSubmit(sendRequest)}>
            <Field
                name="commentText"
                label="Add Comment"
                value={commentText}
                component={InputField}
                onChange={e => onCommentTextChange(e.target.value)}
            />
            <Button 
                type="submit"
            >
                Add Comment
            </Button>
        </form>
    );
}

export default reduxForm({
    form: 'commentForm'
})(CommentForm)