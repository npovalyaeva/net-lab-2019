import React, { PureComponent } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Filter } from "./Filter"
import { BooksList } from "./BooksList"

import '../../styles/main-page/Main.css';

export class Main extends PureComponent {
    
    componentWillMount() {
        this.props.getBooks('');
    }

    render() {
        const booksData = this.props.booksData;

        if (booksData) {
            return (
                <React.Fragment>
                    <Filter filter={this.props.filter}/>
                    <div className="list-of-books">
                        <BooksList booksData={this.props.booksData}/>
                    </div>
                </React.Fragment>
            );
        }
        
        return (
            <CircularProgress className="loading" />
        );
    };
}