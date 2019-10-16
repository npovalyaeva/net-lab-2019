import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    (rest.isPermitted) ?
        (<Route {...rest} component={Component} />)
        : (<Redirect
            to={{
                pathname: rest.redirectTo,
                state: { from: rest.location }
            }}
        />)
);

const mapStateToProps = (state) => {
    return {
        loggedIn: state.users.loggedIn
    }
}

export default connect(mapStateToProps)(ProtectedRoute);
