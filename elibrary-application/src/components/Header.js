import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';

import '../styles/Header.css';

export class Header extends PureComponent {
    render() {
        return (
            <header>
                <Button variant="contained" href="#contained-buttons" className="login-button">
                    Profile
                </Button>
            </header>
        )
    };
}