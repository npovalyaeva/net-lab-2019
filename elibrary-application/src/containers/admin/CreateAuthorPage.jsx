import React, { PureComponent } from 'react';
import { history } from '../../store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';

import AuthorEditForm from '../../components/authors/AuthorEditForm';

import  AuthorActions  from '../../actions/AuthorActions';

import "../../styles/CreateAuthor.css"

class CreateAuthorPage extends PureComponent {

    constructor(props) {
        super(props);
        this.sendCreateAuthorRequest = this.sendCreateAuthorRequest.bind(this);
    }

    sendCreateAuthorRequest(info) {
        let author = {
            firstName: info.firstName,
            lastName: info.lastName,
            patronymic: info.patronymic
        }
        this.props.createAuthor(author);
    }

    render() {
        const { lastName, firstName, patronymic, error } = this.props;
        return(
            <div className="mainContent">
                <div className="editForm">
                    <AuthorEditForm
                        lastName={lastName}
                        firstName={firstName}
                        patronymic={patronymic}
                        onCancelClick={history.goBack}
                        onLastNameChange={this.props.setLastName}
                        onFirstNameChange={this.props.setFirstName}
                        onPatronymicChange={this.props.setPatronymic}
                        sendRequest={(data) => this.sendCreateAuthorRequest(data)}                 
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lastName: state.authors.lastName,
        firstName: state.authors.firstName,
        patronymic: state.authors.patronymic,
        info: state.authors.info,
        error: state.authors.error,
        isLoading: state.authors.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    const bindedCreators = bindActionCreators({
        createAuthor: (author) => {
            return dispatch => {
                dispatch(AuthorActions.createAuthor(author));
            }
        },

        setLastName: (lastName) => {
            return (dispatch) => {
                dispatch(AuthorActions.setCurrentLastName(lastName));
                dispatch(change('authorEditForm', 'lastName', lastName || ''));
            }
        },

        setFirstName: (firstName) => {
            return (dispatch) => {
                dispatch(AuthorActions.setCurrentFirstName(firstName));
                dispatch(change('authorEditForm', 'firstName', firstName || ''));
            }
        },

        setPatronymic: (patronymic) => {
            return (dispatch) => {
                dispatch(AuthorActions.setCurrentPatronymic(patronymic));
                dispatch(change('authorEditForm', 'patronymic', patronymic || ''));
            }
        }
    }, dispatch);
    return {
        ...bindedCreators
    }
}

export default connect(mapStateToProps, 
    mapDispatchToProps)(CreateAuthorPage);