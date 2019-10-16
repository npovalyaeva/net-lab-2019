import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/logo.svg';

import { links } from '../config/links';
import Button from '@material-ui/core/Button';
import "../styles/Header.css";

const Header = ( { isAdmin, loggedIn, onSignOut } ) => (
    <div className="header">
        <div className="nav">
            <Link to='/' className="logo">
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="logo"
                    alt="ELibrary"
                    />
            </Link>
            { !loggedIn &&
                <div>
                    <Link to={ links.SIGN_IN_PAGE } >
                        <Button variant="outlined">
                            Log In
                        </Button>
                    </Link>
                    <Link to={ links.SIGN_UP_PAGE } >
                    <Button variant="outlined">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            }
            {/* <Link to={ links.ABOUT_INFO_PAGE }>About us</Link> */}
            
            { loggedIn &&
            <div>
                <Link to={ links.PROFILE_PAGE } >
                    <Button color="secondary" className="bookButton">
                        Profile
                    </Button>
                </Link>
                <Link
                    to={""}
                    onClick={onSignOut}
                >
                    <Button variant="outlined">
                        Sign Out
                    </Button>
                </Link>
            </div>
            }
        </div>
    </div>
)

export default Header;