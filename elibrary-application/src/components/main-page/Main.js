import React, { PureComponent } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import '../../styles/main-page/Main.css';

export class Main extends PureComponent {
    constructor(props) {
        super(props);  
    }
    
    componentWillMount() {
        this.props.getBooks('');
    }

    render() {
        const booksData = this.props.booksData;

        if (booksData) {
            return (
                <div className="list-of-books">
                    
                </div>
            );
        }
        
        return (
            <CircularProgress className="loading" />
        );
    };
}