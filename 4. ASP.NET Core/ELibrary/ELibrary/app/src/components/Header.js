import React, { PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import logo from '../sources/logo.svg';

export class Header extends PureComponent {

    render() {
        return (
            <AppBar className="app-bar" position="static">
                <Toolbar className="toolbar">
                    <a href="#">
                        <img
                            src={logo}
                            width="50"
                            height="50"
                            className="main-logo"
                            alt="SSAW Library logo"
                        />
                    </a>
                    <Button className="login-button" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        )
    };
}