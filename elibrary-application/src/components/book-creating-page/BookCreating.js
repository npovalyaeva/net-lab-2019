import React, { PureComponent } from 'react';

import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

import '../../styles/book-creating-page/BookCreating.css';

export class BookCreating extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: {
                authorId: -1, 
                firstName: '', 
                lastName: ''
            },
            year: moment().format('YYYY'),
            cover: '',
            coverPreviewURL: '',
            copiesCount: 1
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentWillMount() {
        this.props.getAuthors();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleImageChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                cover: file,
                coverPreviewURL: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    handleSelectChange(event) {
        const value = event.target.value;
        this.setState(state => ({
            author: {
                ...state.author,
                authorId: value,
                firstName: this.props.authorsData[value].firstName,
                lastName: this.props.authorsData[value].lastName
            }
        }))
    }

    render() {
        const authorsData = this.props.authorsData;

        if (authorsData) {
            return (            
                <form className="book-form" noValidate autoComplete="off">
                    <TextField
                        label="Title"
                        className="title-input"
                        value={this.state.title}
                        onChange={this.handleChange}
                        name="title"
                        margin="normal"
                    />
                    <FormControl className="author-select">
                        <InputLabel htmlFor="age-simple">Author</InputLabel>
                        <Select
                            value={this.state.author.authorId}
                            onChange={this.handleSelectChange}
                        >
                        return {authorsData.map(author =>
                            <MenuItem value={author.authorId} key={author.authorId}>{author.lastName} {author.firstName}</MenuItem>
                        )}
                        </Select>
                    </FormControl>
                    <Button className="add-author-button">No Author?</Button>
                    <TextField
                        label="Publication Year"
                        value={this.state.year}
                        onChange={this.handleChange}
                        name="year"
                        type="number"
                        className="year-input"
                        margin="normal"
                    />
                    <TextField
                        label="Count of Copies"
                        value={this.state.copiesCount}
                        onChange={this.handleChange}
                        name="copiesCount"
                        type="number"
                        className="copies-input"
                        margin="normal"
                    />
                    <div class="upload-button-wrapper">
                        <Button 
                            variant="contained" 
                            color="default"
                            onChange={(e)=>this._handleImageChange(e)}
                            className="upload-button"
                        >
                            Upload Book Cover 
                            <CloudUploadIcon className="upload-icon" />
                        </Button>

                        <input className="fileInput" 
                            type="file" 
                            onChange={(e)=>this.handleImageChange(e)}
                        />
                    </div>
                    <Typography component="p">
                        {this.state.cover.name}
                    </Typography>
                    <Button variant="contained" color="secondary" className="add-book-button">
                        Add
                    </Button>
                </form>
            )   
        }
        else
            return (
                <CircularProgress className="loading" />
            );

    };
}