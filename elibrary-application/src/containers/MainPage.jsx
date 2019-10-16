import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { links } from '../config/links';

import "../styles/MainPage.css"
import { Typography } from '@material-ui/core';

class MainPage extends PureComponent {
    render() {
        return (
            <div className="mainContent">
                <div className="welcomeText">
                    <Typography variant="h4" gutterBottom>Explore an awesome world of books:</Typography>
                    <Link to={ links.BOOKS_PAGE } >
                        <Button color="secondary" className="bookButton">
                            Find Book
                        </Button>
                    </Link>
                </div>
            </div>
            
        );
    }
}

export default MainPage;