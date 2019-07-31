import React, { PureComponent } from 'react';
import { Navbar } from "react-bootstrap";

import logo from '../resources/logo.svg';

export class Header extends PureComponent {
    render() {
        return (
            <Navbar.Header>
            <Navbar.Brand href="#home">
                <a href="https://npovalyaeva.github.io/">
                    <img
                        src={logo}
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                        alt="SSAW Weather logo"
                    />
                </a>
            </Navbar.Brand>
            <h4 class="site-name">/ ssawinsp</h4>
        </Navbar.Header>
        )
    };
}