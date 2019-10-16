import React, { PureComponent } from 'react';
import { history } from '../../store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import BookEditForm from '../../components/books/BookEditForm';

import  AuthorActions  from '../../actions/AuthorActions';
import  BookActions  from '../../actions/BookActions';

import "../../styles/CreateAuthor.css"

class CreateBookPage extends PureComponent {

    constructor(props) {
        super(props);
        this.sendCreateBookRequest = this.sendCreateBookRequest.bind(this);
        this.setCover = this.setCover.bind(this);
    }

    componentWillMount() {
        this.props.getListOfAuthors();
    }

    sendCreateBookRequest(info) {
        let book = {
            title: info.title,
            authorId: info.authorId,
            year: info.year,
            cover: info.cover,
            copiesCount: info.copiesCount
        }
        this.props.createBook(book);
    }

    setCover(event) {
        event.preventDefault();
        let blob = null;
        let reader = new FileReader();

        reader.onloadend = function() {
            const arrayBuffer = reader.result;
            blob = new Blob([arrayBuffer], {type: 'image/jpg'});           
        };
        reader.readAsArrayBuffer(event.target.files[0]); 
        this.props.setImage(blob);
    }

    render() {
        const { authors, title, authorId, year, cover, copiesCount, error } = this.props;
        return(
            <div className="mainContent">
                <BookEditForm
                    authors={authors}
                    title={title}
                    authorId={authorId}
                    year={year}
                    copiesCount={copiesCount}
                    onCancelClick={history.goBack}
                    onTitleChange={this.props.setTitle}
                    onAuthorIdChange={this.props.setAuthorId}
                    onYearChange={this.props.setYear}
                    onImageChange={this.setCover}
                    onCopiesCountChange={this.props.setCopiesCount}
                    sendRequest={(data) => this.sendCreateBookRequest(data)}                 
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authors: state.authors.authors,
        title: state.books.title,
        authorId: state.books.authorId,
        year: state.books.year,
        cover: state.books.cover,
        copiesCount: state.books.copiesCount,      
        error: state.books.error,
        info: state.authors.info
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({

        getListOfAuthors: () => {
            return dispatch => {
                dispatch(AuthorActions.getListOfAuthors());
            }
        },

        createBook: (book) => {
            return dispatch => {
                dispatch(BookActions.createBook(book));
            }
        },

        setTitle: (title) => {
            return (dispatch) => {
                dispatch(BookActions.setCurrentTitle(title));
                dispatch(change('bookEditForm', 'title', title || ''));
            }
        },

        setAuthorId: (authorId) => {
            return (dispatch) => {
                dispatch(BookActions.setCurrentAuthorId(authorId));
                dispatch(change('bookEditForm', 'authorId', authorId || ''));
            }
        },

        setYear: (year) => {
            return (dispatch) => {
                dispatch(BookActions.setCurrentYear(year));
                dispatch(change('bookEditForm', 'year', year || ''));
            }
        },

        setCover: (cover) => {
            return (dispatch) => {
                dispatch(BookActions.setCurrentCover(cover));
                dispatch(change('bookEditForm', 'cover', cover || ''));
            }
        },

        setImage: (cover) => {
            return (dispatch) => {
                dispatch(BookActions.setCurrentImage(cover));
                dispatch(change('bookEditForm', 'cover', cover || ''));
            }
        },

        setCopiesCount: (copiesCount) => {
            return (dispatch) => {
                dispatch(BookActions.setCurrentCopiesCount(copiesCount));
                dispatch(change('bookEditForm', 'copiesCount', copiesCount || ''));
            }
        },
    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(CreateBookPage);