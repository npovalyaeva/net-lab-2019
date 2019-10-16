import React from 'react';
import { Typography } from '@material-ui/core';

import "../styles/Footer.css"

const Footer = () => (
    <footer>
        <div className="copyright">
            <Typography variant="p" gutterBottom><div className="copyrihtn-text">©2019 SSAW Library</div></Typography>
        </div>
    </footer>
)

export default Footer;