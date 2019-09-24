import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../../styles/author-creating-page/AuthorCreating.css';

export class AuthorCreating extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            author: {
                lastName: '',
                firstName: '',
                patronymic: '' 
            },
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(state => ({
            author: {
                ...state.author,
                [name]: value
            }
        }))
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createAuthor(this.state.author);
    }

    render() {
        return (            
            <form className="author-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Last Name"
                    className="input"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    name="lastName"
                    margin="normal"
                />
                <TextField
                    label="First Name"
                    className="input"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    name="firstName"
                    margin="normal"
                />
                <TextField
                    label="Patronymic"
                    className="input"
                    value={this.state.patronymic}
                    onChange={this.handleChange}
                    name="patronymic"
                    margin="normal"
                />
                <Button variant="contained" color="secondary" className="add-author-button" type="submit">
                    Create
                </Button>
            </form>
        )   
    };
}