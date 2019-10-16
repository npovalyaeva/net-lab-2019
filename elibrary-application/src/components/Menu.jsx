import React from 'react';
import { Link } from 'react-router-dom';

import { links } from '../config/links';

const Header = ({ loggedIn }) => {
    <div className="header">
        <div className="logo"/>
        <div className="nav">
            <div>
                { loggedIn
                 ? <div>
                        <Link to={ links.PROFILE_PAGE }>
                            Profile
                        </Link>
                        <Link to={""}>
                            Sign out
                        </Link>
                    </div>
                 : <div>
                        <Link to={ links.SIGN_IN_PAGE } >
                            Log in
                        </Link>
                        <Link to={ links.SIGN_UP_PAGE } >
                            Sign up
                        </Link>
                    </div>
                }
            </div>
            <Link to="">About us</Link>
        </div>
    </div>
}

export default Header;