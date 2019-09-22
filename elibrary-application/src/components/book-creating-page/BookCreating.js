import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import '../../styles/book-creating-page/BookCreating.css';

export class BookCreating extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            author: {
                authorId: 0, 
                firstName: '', 
                lastName: ''
            },
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.getAuthors();
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({author: value});
    }

    render() {
        const authors = this.props.authorsData;
        return (
            <FormControl className="book-form">
                <InputLabel htmlFor="age-helper">Author</InputLabel>
                <Select
                    value={values.age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-helper',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {authors.map(a =>
                        <MenuItem value={author.lastName}>{author.lastName}</MenuItem>
                    )}
                </Select>
            </FormControl>
        )   
    };
}