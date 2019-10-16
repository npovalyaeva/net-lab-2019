import React, { PureComponent } from 'react';

import Header from './Header';
import Footer from './Footer';

class Layout extends PureComponent {
    render() {
        const { loggedIn, isAdmin, onSignOut } = this.props;
        return (
            <React.Fragment>
                <Header
                    loggedIn={loggedIn}
                    isAdmin={isAdmin}
                    onSignOut={onSignOut}
                />
                <div className="content">
                    {this.props.children}
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Layout;