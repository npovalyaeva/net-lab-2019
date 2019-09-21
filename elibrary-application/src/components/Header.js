import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import {
    history
} from '../store/store';

export class Header extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Link to={ links.SIGN_IN_PAGE } >
                    Log in
                </Link>

                <Button variant="contained" color="secondary" className="login-button">
                    Login
                </Button>
            </React.Fragment>
        )
    };
}