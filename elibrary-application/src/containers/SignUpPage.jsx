import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../store/store';

import SignUpField from '../components/users/SignUpField';
import { links } from '../config/links';
import  UserActions  from '../actions/UserActions';

import "../styles/CreateAuthor.css"


class SignUpPage extends PureComponent {
    constructor(props) {
        super(props);
        this.sendSignUpRequest = this.sendSignUpRequest.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(UserActions.reset());
    }

    sendSignUpRequest(info) {
        this.props.dispatch(UserActions.reset());
        let user = {
            email: info.email,
            password: info.password,
            username: info.username,
            firstName: info.firstName,
            lastName: info.lastName,
        }
        this.props.dispatch(UserActions.signUp(user));
    }

    render() {
        const { error, redirect } = this.props;
        return(
            <div className="signUpContent">
                {
                    !(redirect)?
                    <div>
                        <SignUpField
                            sendRequest={(data) => this.sendSignUpRequest(data)}
                            onCancelClick={history.goBack}
                        />
                        { error && <h2>Failed to sign up, try again?</h2>}
                    </div>
                    : <Redirect to={links.PROFILE_PAGE}/>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn,
        userInfo: state.users.info,
        error: state.users.error,
        isLoading: state.users.isLoading,
        isValid: state.users.isValid,
        redirect: state.users.redirect
    }
}

export default connect(mapStateToProps)(SignUpPage);