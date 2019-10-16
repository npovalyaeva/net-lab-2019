import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BooksList from '../components/books/BooksList';

import  BookActions  from '../actions/BookActions';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import "../styles/MainPage.css"

class BooksPage extends PureComponent {

    componentWillMount() {
        this.props.getListOfBooks();
    };

    handleChange = name => event => {
        this.props.setSwitchState(event.target.checked);
        if (event.target.checked) {
            this.props.getListOfFreeBooks();
        }
        else {
            this.props.getListOfBooks();
        }
    };

    render() {
        const { books, checked } = this.props;
        return (
            <Fragment>
                <div className="switch">
                        <FormControlLabel
                            control={
                        <Switch checked={checked} onChange={this.handleChange('checked')} value="checked" />
                        }
                        label="Free Books"
                    />
                </div>
                <div className="list-of-books">
                    <BooksList books={books}/>
                </div>
                
            </Fragment>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checked: state.books.switchState,
        books: state.books.books,     
        error: state.books.error,
        info: state.books.info
    }
}

const mapDispatchToProps = (dispatch) => {

    const bindedCreators = bindActionCreators({
        getListOfFreeBooks: () => {
            return dispatch => {
                dispatch(BookActions.getListOfFreeBooks());
            }
        },

        setSwitchState: (switchState) => {
            return dispatch => {
                dispatch(BookActions.setSwitchState(switchState));
            }
        },

        getListOfBooks: () => {
            return dispatch => {
                dispatch(BookActions.getListOfBooks());
            }
        },

    }, dispatch);

    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(BooksPage);