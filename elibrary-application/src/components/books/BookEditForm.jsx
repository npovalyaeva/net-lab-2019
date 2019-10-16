import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { links } from '../../config/links';
import { Link } from 'react-router-dom';
import InputField from '../InputField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "../../styles/CreateAuthor.css"

import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const BookEditForm = (props) => {

    const { handleSubmit, sendRequest, onCancelClick, 
        authors, title, authorId, year, copiesCount,
        onTitleChange, onAuthorIdChange, onYearChange, onImageChange, onCopiesCountChange } = props;    
    
    return (
        <form className="bookEditForm" onSubmit={handleSubmit(sendRequest)}>
            <Typography variant="h5" gutterBottom>
                Add Book
            </Typography>
            <Field
                name="title"
                label="Title"
                type="text"
                component={InputField}
                onChange={e => onTitleChange(e.target.value)}
                value={title}
            />
            <FormControl className="author-select">
                <InputLabel htmlFor="age-simple">Author</InputLabel>
                <Select
                    value={authorId}
                    onChange={e => onAuthorIdChange(e.target.value)}
                >
                    return {authors.map(author =>
                        <MenuItem value={author.authorId} key={author.authorId}>{author.lastName} {author.firstName}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {/* <Link to={ links.CREATE_AUTHOR_PAGE } >
                <Button>
                    No author?
                </Button>
            </Link> */}
            <Field
                name="year"
                label="Year"
                type="number"
                component={InputField}
                onChange={e => onYearChange(e.target.value)}
                value={year}
            />
            {/* <div className="upload-button-wrapper">
                <input 
                    className="fileInput" 
                    type="file" 
                    onChange={(e) => onImageChange(e)}
                />
            </div> */}
            <Field
                name="copiesCount"
                label="Copies Count"
                type="number"
                component={InputField}
                onChange={e => onCopiesCountChange(e.target.value)}
                value={copiesCount}
            />
            <div className="btnBox">
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
            </div>
        </form>
    );  
}

export default reduxForm({
    form: 'bookEditForm'
})(BookEditForm)
